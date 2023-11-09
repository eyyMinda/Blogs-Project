import { MongoClient, ServerApiVersion } from "mongodb";

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

// ----------------------------------------------------------------

export const postToMongo = async (client: MongoClient, collection: string, body: object) => {
  const db = await client.db("blogs_nextjs");
  await db.collection(collection).insertOne(body);
};

/**
 * @param {client} client - object
 * @param {string} collection - string
 * @param {Object} query - object | (Optional)
 * @param {Object} sort - object | (Optional)
 * @returns {Array<Object>} Documents | array of objects
 */
export const getFromMongo = async (client: MongoClient, collection: string, query: object = {}, sort = {}) => {
  const db = client.db("blogs_nextjs");
  const coll = await db.collection(collection);
  const comments = await coll.find(query).sort(sort).limit(10).toArray();
  return comments;
};
