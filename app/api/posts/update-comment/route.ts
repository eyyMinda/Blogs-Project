import { toggleStringInArray, trimObjectValues } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { getClient, getFromMongo, isMongoClient, updateInMongo, updateManyMongo } from "@/lib/mongo-db/mongo";

export async function POST(req: NextRequest) {
  const data = await req.json();
  if (!data) return NextResponse.json({ err: true, msg: "No data has been provided." }, { status: 400 });

  // ============= Validation =============================
  const commentData = trimObjectValues(data, ["comment_id", "like"]);

  // ============= Define/Redefine Client =============================
  const client = await getClient();
  if (!isMongoClient(client)) return client;

  // ============= Check whether the user exists =============================
  const existingUser = (await getFromMongo(client, "users", { email: commentData.email }))[0] as User;
  if (!existingUser) return NextResponse.json({ err: true, msg: "This user does not exist!" }, { status: 401 });
  const userID = existingUser._id.toString();

  // ============= Check if already liked/disliked =============================
  const currentComment = (await getFromMongo(client, "comments", { _id: commentData.comment_id }))[0] as CommentType;
  if (!currentComment) return NextResponse.json({ err: true, msg: "This comment does not exist!" }, { status: 401 });

  // Determine the action and update arrays accordingly
  const isLike: boolean = Boolean(commentData.like);
  currentComment.likes = toggleStringInArray(currentComment.likes, userID, isLike && !currentComment.likes.includes(userID));
  currentComment.dislikes = toggleStringInArray(currentComment.dislikes, userID, !isLike && !currentComment.dislikes.includes(userID));

  // Log the action taken and set the status in one step
  let status: "liked" | "disliked" | "none" = "none";

  if (isLike) {
    status = currentComment.likes.includes(userID) ? "liked" : "none";
    console.log(status === "liked" ? "User is liking the comment..." : "User has liked this comment already. Removing like...");
  } else {
    status = currentComment.dislikes.includes(userID) ? "disliked" : "none";
    console.log(status === "disliked" ? "User is disliking the comment..." : "User has disliked this comment already. Removing dislike...");
  }

  // ============= Update Comment =============================
  try {
    await updateInMongo(client, "comments", { _id: currentComment._id }, { $set: { likes: currentComment.likes, dislikes: currentComment.dislikes } });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ err: true, msg: "Failed to update comment." }, { status: 500 });
  }
  // ============= Final Reaction Response to Client =============================
  const returnData = {
    status,
    likeCount: currentComment.likes.length,
    dislikeCount: currentComment.dislikes.length
  };
  return NextResponse.json({ err: false, returnData, msg: "Successfully updated comment!" }, { status: 200 });
}
