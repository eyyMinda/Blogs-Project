import { ContactInfo } from "@/app/_types/ContactType";
import { trimObjectValues, validateMultipleInputs } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { getClient, getFromMongo, isMongoClient, postToMongo } from "@/lib/mongo-db/mongo";

export async function GET(req: NextRequest) {
  const client = await getClient();
  if (!isMongoClient(client)) return client;

  let comments;
  try {
    comments = await getFromMongo(client, "messages");
  } catch (error) {
    return NextResponse.json({ err: true, msg: "Failed to post a message." }, { status: 500 });
  }

  return NextResponse.json({ err: false, msg: "All Messages", comments }, { status: 201 });
}

export async function POST(req: NextRequest) {
  const data: ContactInfo = await req.json();

  // Validation
  const errors = validateMultipleInputs(
    Object.values(data).map(e => e.trim()),
    Object.keys(data)
  );
  if (errors.length > 0) return NextResponse.json({ err: true, msg: errors }, { status: 422 });

  const newMessage = trimObjectValues(data, ["message"]);

  const client = await getClient();
  if (!isMongoClient(client)) return client;

  try {
    await postToMongo(client, "messages", newMessage);
  } catch (error) {
    return NextResponse.json({ err: true, msg: "Failed to post a message." }, { status: 500 });
  }

  return NextResponse.json({ err: false, msg: "Successfully sent a message!" }, { status: 200 });
}
