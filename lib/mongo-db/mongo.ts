import { MongoClient, ServerApiVersion } from "mongodb";
import { NextResponse } from "next/server";
import { getSortCriteria } from "../utils";

//=================== INIT ====================
const uri = process.env.NEXT_PUBLIC_MONGODB_URI;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
};
let clientPromise: any;

export const connectToMongo = async (): MongoDBClientPromise<MongoClient> => {
  if (clientPromise) return clientPromise;
  if (!uri) throw new Error("No MongoDB URI provided");
  const client = await MongoClient.connect(uri, options);
  clientPromise = client;
  return clientPromise;
};

/**
 * This function checks if an object is an instance of the MongoClient class.
 * @param {any} obj - The `obj` parameter is of type `any`, which means it can be any JS object.
 * @returns a boolean value.
 */
export const isMongoClient = (obj: any): obj is MongoClient => typeof obj?.db === "function";

export const getClient = async () => {
  try {
    const client = await connectToMongo();
    return client;
  } catch {
    return NextResponse.json({ err: true, msg: ["Failed to connect to the database"] }, { status: 500 });
  }
};
// ----------------------------------------------------------------

export const postToMongo = async (client: MongoClient, collection: string, body: object): Promise<void> => {
  const db = client.db("blogs_nextjs");
  await db.collection(collection).insertOne(body);
};
export const insertManyInMongo = async (client: MongoClient, collection: string, body: object[]): Promise<void> => {
  const db = client.db("blogs_nextjs");
  await db.collection(collection).insertMany(body);
};
export const updateInMongo = async (client: MongoClient, collection: string, match: object, body: object): Promise<void> => {
  const db = client.db("blogs_nextjs");
  await db.collection(collection).updateOne(match, body);
};
export const updateManyMongo = async (client: MongoClient, collection: string, match: object, body: object, options?: object): Promise<void> => {
  const db = client.db("blogs_nextjs");
  await db.collection(collection).updateMany(match, body, options);
};
export const deleteFromMongo = async (client: MongoClient, collection: string, match: object): Promise<void> => {
  const db = client.db("blogs_nextjs");
  await db.collection(collection).deleteOne(match);
};
export const findOneMongo = async (client: MongoClient, collection: string, match: object, body: object): Promise<object | null> => {
  const db = client.db("blogs_nextjs");
  const MongoItem = await db.collection(collection).findOne(match, body);
  return MongoItem;
};
export const getCountFromMongo = async (client: MongoClient, collection: string, match: object = {}, options = {}): Promise<number> => {
  const db = client.db("blogs_nextjs");
  const count = await db.collection(collection).count(match, options);
  return count;
};

/**
 * @param {client} client - object
 * @param {string} collection - string
 * @param {Object} match - object | (Optional)
 * @param {Object} sort - object | (Optional)
 * @param {Object} limit - number | (Optional)
 * @param {Object} skip - number | (Optional)
 * @returns {Array<Object>} Documents | array of objects
 */
export const getFromMongo = async (client: MongoClient, collection: string, match: object = {}, sort = {}, limit = 10, skip = 0): Promise<object[]> => {
  const db = client.db("blogs_nextjs");
  const coll = db.collection(collection);
  const items = await coll.find(match).sort(sort).skip(skip).limit(limit).toArray();
  return items;
};

export async function getCommentsWithUserDetails(client: MongoClient, collection: string, post_id: number, limit = 10, skip = 0, sortOption: SortOption) {
  const sortCriteria = getSortCriteria(sortOption);

  const comments = await client
    .db("blogs_nextjs")
    .collection(collection)
    .aggregate([
      { $match: { post_id } },
      {
        // Convert author_id and reply author_ids for lookup as well as date for sorting
        $addFields: {
          author_id: { $convert: { input: "$author_id", to: "objectId", onError: "$author_id" } },
          date: { $convert: { input: "$date", to: "date", onError: "$date" } },
          replies: {
            $map: {
              input: "$replies",
              as: "reply",
              in: {
                _id: "$$reply._id",
                author_id: { $convert: { input: "$$reply.author_id", to: "objectId", onError: "$$reply.author_id" } },
                replied_to: "$$reply.replied_to",
                comment: "$$reply.comment",
                date: { $convert: { input: "$$reply.date", to: "date", onError: "$$reply.date" } },
                edited: "$$reply.edited",
                likes: "$$reply.likes",
                dislikes: "$$reply.dislikes"
              }
            }
          },
          likesCount: { $size: "$likes" }, // Add the count of likes
          repliesCount: { $size: "$replies" }, // Add the count of replies
          popularityScore: {
            $add: [
              { $multiply: ["$likesCount", 1] }, // Weight for likes
              { $multiply: ["$repliesCount", 2] } // Weight for replies
            ]
          }
        }
      },
      {
        // Lookup the author details for each comment
        $lookup: {
          from: "users",
          localField: "author_id",
          foreignField: "_id",
          as: "author"
        }
      },
      {
        $unwind: { path: "$author", preserveNullAndEmptyArrays: true }
      },
      {
        // Lookup author details for each reply inside the 'replies' array
        $lookup: {
          from: "users",
          localField: "replies.author_id",
          foreignField: "_id",
          as: "reply_authors"
        }
      },
      {
        // Add the reply authors to each corresponding reply using $addFields
        $addFields: {
          replies: {
            $map: {
              input: "$replies",
              as: "reply",
              in: {
                _id: "$$reply._id",
                post_id: "$$reply.post_id",
                author_id: "$$reply.author_id",
                comment: "$$reply.comment",
                date: "$$reply.date",
                edited: "$$reply.edited",
                likes: "$$reply.likes",
                dislikes: "$$reply.dislikes",
                replied_to: "$$reply.replied_to",
                author: {
                  $arrayElemAt: [
                    {
                      $filter: {
                        input: "$reply_authors",
                        as: "reply_author",
                        cond: { $eq: ["$$reply_author._id", "$$reply.author_id"] }
                      }
                    },
                    0
                  ]
                }
              }
            }
          }
        }
      },
      {
        // Project to include only specific fields from the author
        $project: {
          _id: 1,
          post_id: 1,
          comment: 1,
          date: 1,
          likes: 1,
          dislikes: 1,
          likesCount: 1,
          repliesCount: 1,
          author: {
            name: "$author.name",
            email: "$author.email",
            image: "$author.image"
          },
          replies: {
            $map: {
              input: "$replies",
              as: "reply",
              in: {
                _id: "$$reply._id",
                post_id: "$$reply.post_id",
                author_id: "$$reply.author_id",
                comment: "$$reply.comment",
                date: "$$reply.date",
                edited: "$$reply.edited",
                likes: "$$reply.likes",
                dislikes: "$$reply.dislikes",
                replied_to: "$$reply.replied_to",
                author: {
                  name: "$$reply.author.name",
                  email: "$$reply.author.email",
                  image: "$$reply.author.image"
                }
              }
            }
          }
        }
      },
      { $sort: sortCriteria }, // Sort based on the criteria provided (e.g., by date, likes, etc.)
      {
        $facet: {
          // Use $facet to handle both the data and total count in one query
          metadata: [{ $count: "totalCount" }],
          data: [{ $skip: skip }, { $limit: limit }]
        }
      },
      {
        // Flatten the metadata result (for cleaner response)
        $unwind: { path: "$metadata", preserveNullAndEmptyArrays: true }
      }
    ])
    .toArray();

  return {
    totalCount: comments[0]?.metadata?.totalCount || 0,
    data: comments[0]?.data || []
  };
}

export async function getCommentOrReplyWithUserDetails(client: MongoClient, collection: string, comment_id: string, replyDepth: number) {
  const matchCondition = replyDepth
    ? { "replies._id": comment_id } // If it's a reply, find the parent comment
    : { _id: comment_id }; // Otherwise, match the comment directly

  const pipeline = [
    { $match: matchCondition },
    {
      // Convert author_id and replied_to for comment and replies
      $addFields: {
        author_id: { $toObjectId: "$author_id" },
        replies: {
          $map: {
            input: "$replies",
            as: "reply",
            in: {
              _id: "$$reply._id",
              author_id: { $toObjectId: "$$reply.author_id" },
              replied_to: { $toObjectId: "$$reply.replied_to" },
              comment: "$$reply.comment",
              date: "$$reply.date",
              edited: "$$reply.edited",
              likes: "$$reply.likes",
              dislikes: "$$reply.dislikes"
            }
          }
        }
      }
    },
    {
      // Lookup the main comment author and the reply authors
      $lookup: {
        from: "users",
        localField: "author_id",
        foreignField: "_id",
        as: "author"
      }
    },
    { $unwind: { path: "$author", preserveNullAndEmptyArrays: true } },
    {
      // Lookup reply authors
      $lookup: {
        from: "users",
        localField: "replies.author_id",
        foreignField: "_id",
        as: "reply_authors"
      }
    },
    {
      // Map reply authors to the replies array
      $addFields: {
        replies: {
          $map: {
            input: "$replies",
            as: "reply",
            in: {
              _id: "$$reply._id",
              author_id: "$$reply.author_id",
              comment: "$$reply.comment",
              date: "$$reply.date",
              edited: "$$reply.edited",
              likes: "$$reply.likes",
              dislikes: "$$reply.dislikes",
              replied_to: "$$reply.replied_to",
              author: {
                $arrayElemAt: [
                  {
                    $filter: {
                      input: "$reply_authors",
                      as: "reply_author",
                      cond: { $eq: ["$$reply_author._id", "$$reply.author_id"] }
                    }
                  },
                  0
                ]
              }
            }
          }
        }
      }
    },
    {
      // If querying a reply, only return that reply in the replies array
      $addFields: {
        replies: replyDepth ? { $filter: { input: "$replies", as: "reply", cond: { $eq: ["$$reply._id", comment_id] } } } : "$replies"
      }
    },
    {
      // Project the required fields (including author details)
      $project: {
        _id: 1,
        post_id: 1,
        comment: 1,
        date: 1,
        edited: 1,
        likes: 1,
        dislikes: 1,
        author: {
          name: "$author.name",
          image: "$author.image",
          email: "$author.email"
        },
        replies: {
          _id: 1,
          author_id: 1,
          comment: 1,
          date: 1,
          edited: 1,
          likes: 1,
          dislikes: 1,
          replied_to: 1,
          author: {
            name: "$replies.author.name",
            image: "$replies.author.image",
            email: "$replies.author.email"
          }
        }
      }
    }
  ];

  const comments = (await client.db("blogs_nextjs").collection(collection).aggregate(pipeline).toArray()) as CommentReplyType[];
  return comments[0] || null; // Return the first matching document or null
}
