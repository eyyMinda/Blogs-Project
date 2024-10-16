import { getClient, getCommentsWithUserDetails, isMongoClient, updateManyMongo } from "@/lib/mongo-db/mongo";
import { NextRequest, NextResponse } from "next/server";

// ------------------------------- POST -------------------------------------
async function handler(req: NextRequest) {
  const data = await req.json();
  if (!data) return NextResponse.json({ err: true, msg: "No data has been provided." }, { status: 400 });

  // ============= Define/Redefine Client =============================
  const client = await getClient();
  if (!isMongoClient(client)) return client;

  // ================= Fetch Comments For Post ==============================
  let comments;

  try {
    comments = (await getCommentsWithUserDetails(client, "comments", data.post_id, 10, Number(data.skip))) as CommentsType;
    if (!comments) return NextResponse.json({ err: true, msg: "No comments..." }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ err: true, msg: "Failed to Fetch Comments for this Post." }, { status: 500 });
  }

  return NextResponse.json({ err: false, data: comments }, { status: 200 });
}

export { handler as POST };
