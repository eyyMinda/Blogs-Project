import { findUpdatedPosts } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { getClient, getFromMongo, insertManyInMongo, isMongoClient } from "@/lib/mongo-db/mongo";
import { DatabasePost } from "@/app/_types/PostType";

async function handler(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json({ err: true, msg: "No data has been provided." }, { status: 400 });
  }
  const data = await req.json();
  console.log(data);
  if (!data || data.length === 0) {
    return NextResponse.json({ err: true, msg: "No data has been provided." }, { status: 400 });
  }

  // ============= Define/Redefine Client =============================
  const client = await getClient();
  if (!isMongoClient(client)) return NextResponse.json({ err: true, msg: "Failed to connect to the database." }, { status: 500 });

  // ============= Fetch and Compare posts / Create an update Obj =============================
  let previousPosts;
  try {
    previousPosts = await getFromMongo(client, "posts");
  } catch (error) {
    if (!Array.isArray(previousPosts)) {
      return NextResponse.json({ err: true, msg: "Failed to fetch previous posts." }, { status: 500 });
    }
  }

  const updatePosts = findUpdatedPosts(data, previousPosts as DatabasePost[]);

  // ============= Update Posts =============================
  try {
    if (updatePosts.length > 0) {
      await insertManyInMongo(client, "posts", updatePosts);
    } else {
      return NextResponse.json({ err: false, msg: "No updates required." }, { status: 200 });
    }

    return NextResponse.json({ err: false, msg: "Successfully updated posts!" }, { status: 200 });
  } catch (error) {
    console.error("Failed to update posts:", error);
    return NextResponse.json({ err: true, msg: "Failed to update posts." }, { status: 500 });
  }
}
export { handler as POST, handler as GET };
