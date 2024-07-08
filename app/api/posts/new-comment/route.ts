import { trimObjectValues, validateMultipleInputs } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { getClient, getFromMongo, isMongoClient, postToMongo } from "@/lib/mongo-db/mongo";

export async function POST(req: NextRequest) {
  const data = await req.json();
  if (!data) return NextResponse.json({ err: true, msg: "No data has been provided." }, { status: 400 });

  // ============= Validation =============================
  const errors = validateMultipleInputs(Object.values(data), Object.keys(data));
  if (errors.length > 0) return NextResponse.json({ err: true, msg: errors }, { status: 422 });

  const newComment = trimObjectValues(data, ["comment"]);
  newComment.date = new Date().toString();

  // ============= Define/Redefine Client =============================
  const client = await getClient();
  if (!isMongoClient(client)) return client;

  // ============= Submit Comment =============================
  try {
    await postToMongo(client, "comments", newComment);
  } catch (error) {
    return NextResponse.json({ err: true, msg: "Failed to comment." }, { status: 500 });
  }

  return NextResponse.json({ err: false, msg: "Successfully commented!" }, { status: 200 });
}
