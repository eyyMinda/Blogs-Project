import { trimObjectValues } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { getClient, isMongoClient, postToMongo } from "@/lib/mongo-db/mongo";

export async function POST(req: NextRequest) {
  const data = await req.json();
  if (!data) return NextResponse.json({ err: true, msg: "No data has been provided." }, { status: 400 });

  // ============= Validation =============================
  const newComment = trimObjectValues(data, ["_id", "post_id", "comment", "date", "replies"]);
  newComment.date = new Date().toString();

  // ============= Define/Redefine Client =============================
  const client = await getClient();
  if (!isMongoClient(client)) return client;

  // ============= Submit Comment =============================
  try {
    await postToMongo(client, "comments", newComment);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ err: true, msg: "Failed to comment." }, { status: 500 });
  }

  return NextResponse.json({ err: false, msg: "Successfully commented!" }, { status: 200 });
}
