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
  //   page: 1 // Which comment page ex.: 10-20 | 50-60
  //   pageSize: 10 // Which comment page
  // };

  // ================= Fetch Comments For Post ==============================
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
  const { post_id, page, pageSize, sortOption } = data;
  const skip = (page - 1) * pageSize;
  let result;
  try {
    result = await getCommentsWithUserDetails(client, "comments", post_id, pageSize, skip, sortOption);
    if (!result) return NextResponse.json({ err: true, msg: "No comments..." }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ err: true, msg: "Failed to Fetch Comments for this Post." }, { status: 500 });
  }

  return NextResponse.json(
    {
      err: false,
      data: {
        comments: result.data,
        metadata: {
          count: result.totalCount,
          page,
          pageSize
        }
      }
    },
    { status: 200 }
  );
}

export { handler as POST };
