import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { connectToMongo, getFromMongo, isMongoClient } from "@/lib/mongo-db/mongo";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import { NextResponse } from "next/server";
import { verifyPassword } from "@/lib/auth-valid/auth";

interface User {
  id: string;
  email: string;
  password: string;
}

const authOptions = {
  adapter: MongoDBAdapter(connectToMongo()),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials, req) {
        if (!credentials) return null;
        const { email, password } = credentials;

        const client = await connectToMongo();
        if (!isMongoClient(client)) return client;

        const matchedUser = (await getFromMongo(client, "users", { email: email }))[0] as User;
        const passwordMatch = await verifyPassword(password, matchedUser.password);
        console.log(passwordMatch);
        if (passwordMatch) {
          return {
            id: matchedUser.id,
            email: matchedUser.email
          };
        }
        // return NextResponse.json({ err: true, msg: "No data has been provided." }, { status: 400 });
        return null;
      }
    }),
    GitHubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET ?? ""
    })
  ]
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
