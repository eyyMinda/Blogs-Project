import { createUser } from "@/lib/locale/default-user";
import { getClient, getFromMongo, isMongoClient, postToMongo } from "@/lib/mongo-db/mongo";
import { trimObjectValues, validateMultipleInputs } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data: DataObject = await req.json();
  if (!data) return NextResponse.json({ err: true, msg: "No data has been provided." }, { status: 400 });

  // ================== Validation ====================================
  const errors = validateMultipleInputs(Object.values(data), Object.keys(data));
  if (errors.length > 0) return NextResponse.json({ err: true, msg: errors }, { status: 422 });

  const { email, password } = trimObjectValues(data);

  // ============= Define/Redefine Client =============================
  const client = await getClient();
  if (!isMongoClient(client)) return client;

  // ============== Check if User Exists ==============================
  const existingUser = await getFromMongo(client, "users", { email: email });
  if (existingUser.length) return NextResponse.json({ err: true, msg: `User with this email ${email} already exists.` }, { status: 422 });

  // ================== Create User ===================================
  const newUser = await createUser({ email, password });
  console.log("Fresh & New User Data: ", newUser);

  try {
    await postToMongo(client, "users", newUser);
  } catch (error) {
    return NextResponse.json({ err: true, msg: "Failed to Sign-up." }, { status: 500 });
  }

  return NextResponse.json({ err: false, msg: `Successfully Signed-up!` }, { status: 200 });
}
