import NextAuth, { User as AuthUser, Account } from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { connectToMongo, getFromMongo, isMongoClient, postToMongo, updateInMongo } from "@/lib/mongo-db/mongo";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import { hashPassword, verifyPassword } from "@/lib/auth-valid/auth";
import { isValid } from "@/lib/auth-valid/isValid";

export const authOptions: any = {
  session: {
    maxAge: 60 * 60 * 24 * 14
  },
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

        return { id: matchedUser.id, email: matchedUser.email, username: matchedUser.name, createdAt: matchedUser.createdAt };
      }
    }),
    GitHubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET ?? ""
    })
  ],
  callbacks: {
    async signIn({ user, account }: { user: AuthUser; account: Account }) {
      console.log("checking provider");
      if (account.provider === "credentials") return true;
      console.log("provider is not credentials??");

      if (account.provider === "github") {
        let client;
        try {
          client = await connectToMongo();
          if (!isMongoClient(client)) throw new Error("Failed to connect to the database.");
        } catch (error) {
          throw new Error("Failed to connect to the database.");
        }

        const email = user.email || "";
        const date = new Date();
        const tempUsername = "user_" + (await hashPassword(email.substring(0, email.indexOf("@")))).slice(0, 9);
        const signUpData = {
          email: user.email,
          name: tempUsername,
          createdAt: date,
          updatedAt: date
        };
        user.name = tempUsername;

        const matchedUser = (await getFromMongo(client, "users", { email: email }))[0] as User;
        if (!matchedUser) {
          try {
            await postToMongo(client, "users", signUpData);
          } catch (error) {
            throw new Error("Failed to Sign-up on the database.");
          }
        } else {
          try {
            await updateInMongo(
              client,
              "users",
              { id: matchedUser.id },
              {
                name: tempUsername,
                updatedAt: date
              }
            );
          } catch (error) {
            throw new Error("Failed to Update user on the database.");
          }
        }
      }
      return true;
    }
  }
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
