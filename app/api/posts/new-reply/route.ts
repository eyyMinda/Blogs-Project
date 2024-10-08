import { trimObjectValues } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { getClient, getFromMongo, isMongoClient, updateInMongo } from "@/lib/mongo-db/mongo";

export async function POST(req: NextRequest) {
  const data = await req.json();
  if (!data) return NextResponse.json({ err: true, msg: "No data has been provided." }, { status: 400 });

  // ============= Validation =============================
  const newReply = trimObjectValues(data.comment, ["_id", "post_id", "comment", "date", "likes", "dislikes"]) as any;

  // ============= Define/Redefine Client =============================
  const client = await getClient();
  if (!isMongoClient(client)) return client;

  // ============= Check current Comment or comment that contains reply in array =============================
  const currentComment = data.replyDepth
    ? ((await getFromMongo(client, "comments", { "replies._id": newReply.comment_id }))[0] as CommentType)
    : ((await getFromMongo(client, "comments", { _id: newReply.comment_id }))[0] as CommentType);

  if (!currentComment) return NextResponse.json({ err: true, msg: "This comment does not exist!" }, { status: 401 });

  // ============= Insert new reply to comment replies =============================
  delete newReply.comment_id;

  // ============= Update Comment with new reply =============================
  try {
    await updateInMongo(client, "comments", { _id: currentComment._id }, { $push: { replies: newReply } });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ err: true, msg: "Failed to update comment." }, { status: 500 });
  }

  return NextResponse.json({ err: false, msg: "Successfully commented!" }, { status: 200 });
}
