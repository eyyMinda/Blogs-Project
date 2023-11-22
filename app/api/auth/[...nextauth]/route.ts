import NextAuth, { User as AuthUser, Account } from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { connectToMongo, getFromMongo, isMongoClient, postToMongo, updateInMongo } from "@/lib/mongo-db/mongo";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import { verifyPassword } from "@/lib/auth-valid/auth";
import { isValid } from "@/lib/auth-valid/isValid";
import { createUser } from "@/lib/locale/default-user";

export const authOptions: any = {
  session: {
    strategy: "jwt",
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

        const { id, email, name, image, createdAt } = matchedUser;
        return { id, email, name, image, createdAt };
      }
    }),
    GitHubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET ?? ""
    })
  ],
  callbacks: {
    async signIn({ user, account }: { user: AuthUser; account: Account }) {
      let userExtended: any = { ...user };
      if (account.provider === "credentials") return true;

      if (account.provider === "github") {
        console.log("Github provider");
        let client;
        try {
          client = await connectToMongo();
          if (!isMongoClient(client)) throw new Error("Failed to connect to the database.");
        } catch (error) {
          throw new Error("Failed to connect to the database.");
        }

        const email = user.email || "";

        const newUser = await createUser(email, user.image ? user.image : null);

        user.name = newUser.name;
        console.log("Additional User Data for Github Provider: ", newUser);

        const matchedUser = (await getFromMongo(client, "users", { email: email }))[0] as User;
        if (!matchedUser) {
          try {
            await postToMongo(client, "users", newUser);
          } catch (error) {
            throw new Error("Failed to Sign-up on the database.");
          }
        } else {
          try {
            const updateObj: any = { name: user.name, updatedAt: newUser.updatedAt };
            if (newUser.image !== matchedUser.image) userExtended.image = matchedUser.image;
            await updateInMongo(client, "users", { id: matchedUser.id }, { $set: updateObj });
            userExtended.createdAt = matchedUser.createdAt;
          } catch (error) {
            throw new Error("Failed to Update user on the database.");
          }
        }
      }
      return { ...userExtended };
    }
  }
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
