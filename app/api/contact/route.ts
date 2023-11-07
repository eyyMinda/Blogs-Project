import { ContactInfo } from "@/app/_types/ContactType";
import { validateMultipleInputs } from "@/lib/utils";

export async function GET() {
  return Response.json({ message: "hi there" });
}
export async function POST(req: Request) {
  const data: ContactInfo = await req.json();

  // Validation
  const validators = ["name", "email", "text"];
  const errors = validateMultipleInputs([data.name, data.email, data.message], validators);
  if (errors.length > 0) return Response.json({ message: errors });

  console.log("SERVER: ", data);

  return Response.json(data);
}
