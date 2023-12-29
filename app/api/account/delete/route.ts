import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { deleteFromMongo, getClient, isMongoClient } from "@/lib/mongo-db/mongo";

// --------------------------- POST -------------------------------------
async function handler(req: NextRequest) {
  const email: DataObject = await req.json();
  if (!email) return NextResponse.json({ err: true, msg: "No email has been provided." }, { status: 400 });

  // ============= Define/Redefine Client =============================
  const client = await getClient();
  if (!isMongoClient(client)) return client;

  // ============== Check if User is Authorized ==============================
  const session = await getServerSession();
  if (!session) return NextResponse.json({ err: true, msg: "You are not authorized! This action will be noted." }, { status: 401 });

  // ================== Delete User ===================================
  try {
    await deleteFromMongo(client, "users", { email: email });
  } catch (error) {
    return NextResponse.json({ err: true, msg: "Failed to Delete account." }, { status: 500 });
  }

  return NextResponse.json({ err: false, msg: `Account has been deleted.` }, { status: 200 });
}

export { handler as POST, handler as DELETE };
