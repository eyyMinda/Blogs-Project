import { ContactInfo } from "@/app/_types/ContactType";

export async function GET() {
  return Response.json({ message: "hi there" });
}
export async function POST(req: Request) {
  const data: ContactInfo = await req.json();
  console.log("SERVER: ", data);
  return Response.json(data);
}
