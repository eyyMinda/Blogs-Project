import { hashPassword, verifyPassword } from "@/lib/auth-valid/auth";
import { getClient, getFromMongo, isMongoClient, updateInMongo } from "@/lib/mongo-db/mongo";
import { trimObjectValues, validateMultipleInputs } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// ----------------------- POST, PUT, PATCH -------------------------------------
async function handler(req: NextRequest) {
  const data: DataObject = await req.json();
  if (!data) return NextResponse.json({ err: true, msg: "No data has been provided." }, { status: 400 });

  // ============== Check if User is Authorized ==============================
  // Disabled for now, due to reset password without being logged in
  // Enable only after email confirmation is finished to validate selected email.
  // const session = await getServerSession();
  // if (!session) return NextResponse.json({ err: true, msg: "You are not authorized! This action will be noted." }, { status: 401 });

  // ============= Define/Redefine Client =============================
  const client = await getClient();
  if (!isMongoClient(client)) return client;

  // ================== Validation ====================================
  const errors = validateMultipleInputs(Object.values(data), Object.keys(data));
  if (errors.length > 0) return NextResponse.json({ err: true, msg: errors }, { status: 422 });

  const continueData = trimObjectValues(data);

  // ================= Does User Exist ==============================
  const existingUser = (await getFromMongo(client, "users", { email: continueData.email }))[0] as User;
  if (!existingUser) return NextResponse.json({ err: true, msg: "This user does not exist!" }, { status: 401 });

  if (data.password) {
    // ============== Check if Old Password is Correct ==============================
    if (continueData.passwordOld) {
      let passwordMatch = await verifyPassword(continueData.passwordOld, existingUser.password);
      if (!passwordMatch) return NextResponse.json({ err: true, msg: "Incorrect old password for this email account." }, { status: 401 });
    }
  }
  if (data.username) {
    // ============== Check if Username is Taken ==============================
    const existingUserWithName = (await getFromMongo(client, "users", { name: continueData.username }))[0] as User[];
    if (existingUserWithName)
      return NextResponse.json({ err: true, msg: "This username is already taken. Please choose a different username." }, { status: 409 });
  }

  // ================== Update User ===================================
  const date = new Date();

  try {
    const updateData = { updatedAt: date } as User;
    if (data.password) {
      const newPassword = await hashPassword(continueData.password);
      updateData.password = newPassword;
      updateData.misc = "25879" + continueData.password + "16063";
    } else if (data.username) {
      updateData.name = continueData.username;
    } else if (data.image) {
      updateData.image = continueData.image;
    }

    await updateInMongo(client, "users", { email: continueData.email }, { $set: updateData });
  } catch (error) {
    return NextResponse.json({ err: true, msg: "Failed to Update Account." }, { status: 500 });
  }

  return NextResponse.json({ err: false, msg: `Account Successfully Updated!` }, { status: 200 });
}

export { handler as POST, handler as PUT, handler as PATCH };
