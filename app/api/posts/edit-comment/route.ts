import { trimObjectValues } from "@/lib/utils";
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

  // ============= Check if already liked/disliked =============================
  const currentComment = data.replyDepth
    ? ((await getFromMongo(client, "comments", { "replies._id": commentData.comment_id }))[0] as CommentType)
    : ((await getFromMongo(client, "comments", { _id: commentData.comment_id }))[0] as CommentType);
  if (!currentComment) return NextResponse.json({ err: true, msg: "This comment does not exist!" }, { status: 401 });

  // ============= Extracting the reply for logic =============================
  const replyComment = data.replyDepth ? (currentComment.replies?.find(obj => obj._id === commentData.comment_id) as CommentType) : currentComment;

  //TODO: Should add 2 new params? Edited status, last updated? Maybe history of edits?

  //TODO: Should rewrite the logic for comments where it doesn't contain the actual comment author data,
  // just a reference to the author user object in db.

  // ============= Update Comment =============================
  let updateQuery, updateOptions;
  if (data.replyDepth) {
    updateQuery = { "replies._id": commentData.comment_id };
    updateOptions = { _id: commentData.comment_id };
  } else {
    updateQuery = { "replies._id": commentData.comment_id };
    updateOptions = { $set: { "replies.$.comment": replyComment.comment } };
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
