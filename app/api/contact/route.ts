import { ContactInfo } from "@/app/_types/ContactType";
import { validateMultipleInputs } from "@/lib/utils";

export async function GET() {
  return Response.json({ message: "hi there" });
}

export async function POST(req: Request, res: Response) {
  const { name, email, message }: ContactInfo = await req.json();

  // Validation
  const validators = ["name", "email", "text"];
  const errors = validateMultipleInputs([name, email, message], validators);
  if (errors.length > 0) return Response.json({ message: errors });

  console.log("SERVER: ", name, email, message);

  return Response.json({ name, email, message });
}
