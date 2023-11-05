export async function GET() {
  return Response.json({ message: "hi there" });
}
export async function POST(req) {
  const data = await req.json();
  console.log("SERVER: ", data);
  return Response.json(data);
}
