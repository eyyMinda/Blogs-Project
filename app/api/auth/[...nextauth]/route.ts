import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { connectToMongo, getFromMongo, isMongoClient } from "@/lib/mongo-db/mongo";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import { verifyPassword } from "@/lib/auth-valid/auth";
import { isValid } from "@/lib/auth-valid/isValid";

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
        const data = { email: credentials.email, password: credentials.password };

        const emailErr = isValid.email(data.email);
        if (emailErr[0]) throw new Error(emailErr[1]);
        const passwordErr = isValid.password(data.password);
        if (passwordErr[0]) throw new Error(passwordErr[1]);

        let client;
        try {
          client = await connectToMongo();
          if (!isMongoClient(client)) throw new Error("Failed to connect to the database.");
        } catch (error) {
          throw new Error("Failed to connect to the database.");
        }

        const matchedUser = (await getFromMongo(client, "users", { email: data.email }))[0] as User;
        const passwordMatch = await verifyPassword(data.password, matchedUser.password);
        if (passwordMatch) throw new Error("Incorrect password for this email account.");

        return { id: matchedUser.id, email: matchedUser.email };
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
