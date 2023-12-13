import { hashPassword, verifyPassword } from "@/lib/auth-valid/auth";
import { getClient, getFromMongo, isMongoClient, updateInMongo } from "@/lib/mongo-db/mongo";
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

  const { email, password, passwordOld } = trimObjectValues(data);

  // ============= Define/Redefine Client =============================
  const client = await getClient();
  if (!isMongoClient(client)) return client;

  // ============== Check if User is Authorized ==============================
  const session = (await getServerSession()) as any;
  if (!session) return NextResponse.json({ err: true, msg: "You are not authorized! This action will be noted." }, { status: 401 });

  // ============== Check if Old Password is Correct ==============================
  if (passwordOld) {
    const existingUser = (await getFromMongo(client, "users", { email: email }))[0] as User;
    console.log("Compare old password: ", passwordOld, existingUser.password);
    let passwordMatch = await verifyPassword(passwordOld, existingUser.password);
    if (!passwordMatch) return NextResponse.json({ err: true, msg: "Incorrect old password for this email account." }, { status: 401 });
  }

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
