import { getClient, getFromMongo, isMongoClient } from "@/lib/mongo-db/mongo";
import { trimObjectValues, validateMultipleInputs } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

// ------------------------------- POST -------------------------------------
async function handler(req: NextRequest) {
  const data: DataObject = await req.json();
  if (!data) return NextResponse.json({ err: true, msg: "No data has been provided." }, { status: 400 });

  // ============= Define/Redefine Client =============================
  const client = await getClient();
  if (!isMongoClient(client)) return client;

  // ================== Validation ====================================
  const errors = validateMultipleInputs(Object.values(data), Object.keys(data));
  if (errors.length > 0) return NextResponse.json({ err: true, msg: errors }, { status: 422 });

  const continueData = trimObjectValues(data);

  // ================= Does User Exist ==============================
  try {
    const existingUser = (await getFromMongo(client, "users", { email: continueData.email }))[0] as User;
    if (!existingUser) return NextResponse.json({ err: true, msg: "This user does not exist!" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ err: true, msg: "Failed to Update Account." }, { status: 500 });
  }

  return NextResponse.json({ err: false, msg: `Email is valid.` }, { status: 200 });
}

export { handler as POST };
