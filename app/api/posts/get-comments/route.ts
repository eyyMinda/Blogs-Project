import { getClient, getCommentsWithUserDetails, isMongoClient } from "@/lib/mongo-db/mongo";
import { NextRequest, NextResponse } from "next/server";

// ------------------------------- POST -------------------------------------
async function handler(req: NextRequest) {
  const data = await req.json();
  if (!data) return NextResponse.json({ err: true, msg: "No data has been provided." }, { status: 400 });

  // ============= Define/Redefine Client =============================
  const client = await getClient();
  if (!isMongoClient(client)) return client;

  // ================= data example ==============================
  // const dat = {
  //   post_id: "",
  //   comment_id: "" || undefined, // If "View replies"
  //   skip: 0 // Which comment page ex.: 10-20 | 50-60
  // };

  // ================= Fetch Comments For Post ==============================
  let comments;
  // : CommentType[] = [
  //   {
  //     _id: 15151561561654654465,
  //     post_id: 1,
  //     author_id: "657a2c75203f21d5d5aed687",
  //     comment: "New Comment here",
  //     date: new Date().toString(),
  //     replies: [],
  //     likes: [],
  //     dislikes: [],
  //   }
  // ];
  try {
    comments = (await getCommentsWithUserDetails(client, "comments", data.post_id, 10, Number(data.skip))) as CommentsType;
    if (!comments) return NextResponse.json({ err: true, msg: "No comments..." }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ err: true, msg: "Failed to Fetch Comments for this Post." }, { status: 500 });
  }

  return NextResponse.json({ err: false, data: comments }, { status: 200 });
}

export { handler as POST };
