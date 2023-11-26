import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth-valid/nextAuth";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
