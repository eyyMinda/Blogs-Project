import { trimObjectValues } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { deleteFromMongo, getClient, getFromMongo, isMongoClient, updateInMongo } from "@/lib/mongo-db/mongo";

export async function POST(req: NextRequest) {
  const data = await req.json();
  if (!data) return NextResponse.json({ err: true, msg: "No data has been provided." }, { status: 400 });

  // ============= Validation =============================
  const comment = trimObjectValues(data.comment, ["comment_id"]);

  // ============= Define/Redefine Client =============================
  const client = await getClient();
  if (!isMongoClient(client)) return client;

  // ============= Delete Comment =============================
  try {
    if (data.replyDepth) {
      await updateInMongo(client, "comments", { "replies._id": comment.comment_id }, { $pull: { replies: { _id: comment.comment_id } } });
    } else {
      await deleteFromMongo(client, "comments", { _id: comment.comment_id });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ err: true, msg: "Failed to comment." }, { status: 500 });
  }

  return NextResponse.json({ err: false, msg: "Successfully commented!" }, { status: 200 });
}
