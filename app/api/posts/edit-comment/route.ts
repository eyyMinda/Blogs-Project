import { NextRequest, NextResponse } from "next/server";
import { getClient, getFromMongo, isMongoClient, updateInMongo } from "@/lib/mongo-db/mongo";

export async function POST(req: NextRequest) {
  const data = await req.json();
  if (!data) return NextResponse.json({ err: true, msg: "No data has been provided." }, { status: 400 });

  // ============= Define/Redefine Client =============================
  const client = await getClient();
  if (!isMongoClient(client)) return client;

  const { comment: commentData } = data;
  // ============= Check whether the user exists =============================
  const existingUser = (await getFromMongo(client, "users", { $expr: { $eq: [{ $toString: "$_id" }, commentData.author_id] } }))[0] as User;
  if (!existingUser) return NextResponse.json({ err: true, msg: "This user does not exist!" }, { status: 401 });

  //TODO: Should add 2 new params? Edited status, last updated? Maybe history of edits?

  // ============= Update Comment =============================
  let updateQuery, updateOptions;
  if (data.replyDepth) {
    updateQuery = { "replies._id": commentData.comment_id };
    updateOptions = { $set: { "replies.$.comment": commentData.comment, "replies.$.edited": true } };
  } else {
    updateQuery = { _id: commentData.comment_id };
    updateOptions = { $set: { comment: commentData.comment, edited: true } };
  }

  try {
    await updateInMongo(client, "comments", updateQuery, updateOptions);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ err: true, msg: "Failed to update comment." }, { status: 500 });
  }
  // ============= Final Reaction Response to Client =============================

  return NextResponse.json({ err: false, msg: "Successfully updated the comment." }, { status: 200 });
}
