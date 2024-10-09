import { toggleStringInArray, trimObjectValues } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { getClient, getFromMongo, isMongoClient, updateInMongo, updateManyMongo } from "@/lib/mongo-db/mongo";

export async function POST(req: NextRequest) {
  const data = await req.json();
  if (!data) return NextResponse.json({ err: true, msg: "No data has been provided." }, { status: 400 });

  // ============= Validation =============================
  const commentData = trimObjectValues(data.comment, ["comment_id", "like"]);

  // ============= Define/Redefine Client =============================
  const client = await getClient();
  if (!isMongoClient(client)) return client;

  // ============= Check whether the user exists =============================
  const existingUser = (await getFromMongo(client, "users", { email: commentData.email }))[0] as User;
  if (!existingUser) return NextResponse.json({ err: true, msg: "This user does not exist!" }, { status: 401 });
  const userID = existingUser._id.toString();

  // ============= Check if already liked/disliked =============================
  const currentComment = data.replyDepth
    ? ((await getFromMongo(client, "comments", { "replies._id": commentData.comment_id }))[0] as CommentType)
    : ((await getFromMongo(client, "comments", { _id: commentData.comment_id }))[0] as CommentType);
  if (!currentComment) return NextResponse.json({ err: true, msg: "This comment does not exist!" }, { status: 401 });

  // ============= Extracting the reply for logic =============================
  const replyComment = data.replyDepth ? (currentComment.replies?.find(obj => obj._id === commentData.comment_id) as CommentType) : currentComment;

  // Determine the action and update arrays accordingly
  const isLike: boolean = Boolean(commentData.like);
  replyComment.likes = toggleStringInArray(replyComment.likes, userID, isLike && !replyComment.likes.includes(userID));
  replyComment.dislikes = toggleStringInArray(replyComment.dislikes, userID, !isLike && !replyComment.dislikes.includes(userID));

  // Log the action taken and set the status in one step
  let status: "liked" | "disliked" | "none" = "none";
  let message: string;
  if (isLike) {
    status = replyComment.likes.includes(userID) ? "liked" : "none";
    message = status === "liked" ? "User is liking the comment..." : "User has liked this comment already. Removing like...";
  } else {
    status = replyComment.dislikes.includes(userID) ? "disliked" : "none";
    message = status === "disliked" ? "User is disliking the comment..." : "User has disliked this comment already. Removing dislike...";
  }

  // ============= Update Comment =============================
  const updateQuery = data.replyDepth ? { "replies._id": commentData.comment_id } : { _id: commentData.comment_id };
  const updateOptions = data.replyDepth
    ? {
        $set: {
          "replies.$.likes": replyComment.likes, // Positional operator ($) updates the specific element based on query
          "replies.$.dislikes": replyComment.dislikes
        }
      }
    : { $set: { likes: replyComment.likes, dislikes: replyComment.dislikes } };

  try {
    await updateInMongo(client, "comments", updateQuery, updateOptions);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ err: true, msg: "Failed to update comment." }, { status: 500 });
  }
  // ============= Final Reaction Response to Client =============================
  const returnData = {
    status,
    likeCount: replyComment.likes.length,
    dislikeCount: replyComment.dislikes.length
  };
  return NextResponse.json({ err: false, returnData, msg: message }, { status: 200 });
}
