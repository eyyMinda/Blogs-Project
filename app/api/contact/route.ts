import { ContactInfo } from "@/app/_types/ContactType";
import { validateMultipleInputs } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return Response.json({ message: "hi there" });
}

export async function POST(req: NextRequest) {
  const data: ContactInfo = await req.json();

  // Validation
  const errors = validateMultipleInputs(Object.values(data), Object.keys(data));
  if (errors.length > 0) return NextResponse.json({ err: true, message: errors }, { status: 422 });

  const newMessage = data;
  console.log("SERVER: ", newMessage);

  return NextResponse.json({ err: false, message: "Successfully sent a message!" }, { status: 200 });
}
