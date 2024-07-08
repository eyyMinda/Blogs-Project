import { MongoClient, ServerApiVersion } from "mongodb";
import { NextResponse } from "next/server";

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
  const db = await client.db("blogs_nextjs");
  await db.collection(collection).insertOne(body);
};

export const updateInMongo = async (client: MongoClient, collection: string, match: object, body: object): Promise<void> => {
  const db = await client.db("blogs_nextjs");
  await db.collection(collection).updateOne(match, body);
};

export const deleteFromMongo = async (client: MongoClient, collection: string, match: object): Promise<void> => {
  const db = await client.db("blogs_nextjs");
  await db.collection(collection).deleteOne(match);
};

export const findOneMongo = async (client: MongoClient, collection: string, match: object, body: object): Promise<object | null> => {
  const db = await client.db("blogs_nextjs");
  const MongoItem = await db.collection(collection).findOne(match, body);
  return MongoItem;
};

/**
 * @param {client} client - object
 * @param {string} collection - string
 * @param {Object} query - object | (Optional)
 * @param {Object} sort - object | (Optional)
 * @param {Object} limit - number | (Optional)
 * @param {Object} skip - number | (Optional)
 * @returns {Array<Object>} Documents | array of objects
 */
export const getFromMongo = async (client: MongoClient, collection: string, query: object = {}, sort = {}, limit = 10, skip = 0): Promise<object[]> => {
  const db = client.db("blogs_nextjs");
  const coll = await db.collection(collection);
  const items = await coll.find(query).sort(sort).skip(skip).limit(limit).toArray();
  return items;
};
