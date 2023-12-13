import { hashPassword } from "@/lib/auth-valid/auth";
import { getClient, isMongoClient, updateInMongo } from "@/lib/mongo-db/mongo";
import { trimObjectValues, validateMultipleInputs } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// --------------------------- POST -------------------------------------
export async function POST(req: NextRequest) {
  const data: DataObject = await req.json();
  if (!data) return NextResponse.json({ err: true, msg: "No data has been provided." }, { status: 400 });

  console.log(data);
  // ================== Validation ====================================
  const errors = validateMultipleInputs(Object.values(data), Object.keys(data));
  if (errors.length > 0) return NextResponse.json({ err: true, msg: errors }, { status: 422 });

  const { email, password } = trimObjectValues(data);

  // ============= Define/Redefine Client =============================
  const client = await getClient();
  if (!isMongoClient(client)) return client;

  // ============== Check if User is Authorized ==============================
  const session = (await getServerSession()) as any;
  if (!session) return NextResponse.json({ err: true, msg: "You are not authorized! This action will be noted." }, { status: 401 });

  // ================== Update User ===================================
  const date = new Date();
  const newPassword = await hashPassword(password);

  try {
    await updateInMongo(client, "users", { email: email }, { $set: { email: email, password: newPassword, updatedAt: date } });
  } catch (error) {
    return NextResponse.json({ err: true, msg: "Failed to Update Account. (2/2)" }, { status: 500 });
  }

  return NextResponse.json({ err: false, msg: `Account Successfully Updated!` }, { status: 200 });
}
