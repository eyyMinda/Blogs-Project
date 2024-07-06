import { trimObjectValues, validateMultipleInputs } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { getClient, getFromMongo, isMongoClient, postToMongo } from "@/lib/mongo-db/mongo";

export async function POST(req: NextRequest) {
  const data = await req.json();
  if (!data) return NextResponse.json({ err: true, msg: "No data has been provided." }, { status: 400 });

  // Validation
  const errors = validateMultipleInputs(Object.values(data), Object.keys(data));
  if (errors.length > 0) return NextResponse.json({ err: true, msg: errors }, { status: 422 });

  const newMessage = trimObjectValues(data, ["subject", "message"]);

  const client = await getClient();
  if (!isMongoClient(client)) return client;

  try {
    await postToMongo(client, "messages", newMessage);
  } catch (error) {
    return NextResponse.json({ err: true, msg: "Failed to send a message." }, { status: 500 });
  }

  return NextResponse.json(
    { err: false, msg: data.username === "pastaizgud" ? "Hi there Mysterious Tina ⭐⭐⭐" : "Successfully sent a message!" },
    { status: 200 }
  );
}
