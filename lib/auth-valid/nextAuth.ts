import { User as AuthUser, Account } from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import { connectToMongo, getFromMongo, isMongoClient, postToMongo, updateInMongo } from "@/lib/mongo-db/mongo";
import { verifyPassword } from "@/lib/auth-valid/auth";
import { isValid } from "@/lib/auth-valid/isValid";
import { createUser, defaultUserImg } from "@/lib/locale/default-user";
import { kebabToCapitalized } from "../utils";

export const authOptions: any = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 14
  },
  adapter: MongoDBAdapter(connectToMongo()),
  pages: {
    signIn: "/login"
  },
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
        if (!matchedUser.password) {
          const provider = kebabToCapitalized(matchedUser.provider);
          throw new Error(`This account is associated with ${provider}. Please login with ${provider} and add a password.`);
        }

        let passwordMatch = await verifyPassword(data.password, matchedUser.password);
        if (!passwordMatch) throw new Error("Incorrect password for this email account.");

        const { id, email, name, image, createdAt, emailVerified } = matchedUser;
        const user = { id, email, name, image, createdAt, emailVerified };

        return user;
      }
    }),
    GitHubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET ?? "",
      profile(profile) {
        console.log("Profile from Github: ", profile);
        // Modifying here doesn't work for some reason.
        const [createdAt, emailVerified, needPassword] = ["Sun Nov 26 2023 16:44:22 GMT+0000 (Coordinated Universal Time)", true, true];
        console.log("USER", profile.login);
        return {
          id: profile.id.toString(),
          name: profile.login ?? profile.name,
          email: profile.email,
          image: profile.avatar_url,
          createdAt: createdAt,
          emailVerified: emailVerified,
          needPassword: needPassword
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        let client;
        try {
          client = await connectToMongo();
          if (!isMongoClient(client)) throw new Error("Failed to connect to the database.");
        } catch (error) {
          throw new Error("Failed to connect to the database.");
        }

        const matchedUser = (await getFromMongo(client, "users", { email: user.email }))[0] as User;

        console.log("JWT USER", user);
        token.createdAt = matchedUser.createdAt || user.createdAt;
        token.emailVerified = matchedUser.emailVerified || user.emailVerified || true;
        token.needPassword = !!matchedUser.password || user.needPassword;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token && session.user) {
        console.log("TOKEN", token);
        session.user.createdAt = token.createdAt;
        session.user.emailVerified = token.emailVerified;
        session.user.needPassword = token.needPassword;
      }
      return session;
    },
    async signIn({ user, account }: { user: AuthUser; account: Account }) {
      if (account.provider === "credentials") {
        console.log("user from signIn(): ", user);
        return user;
      }

      let returnValue: any = true;
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

        const newUser = await createUser({ email, image: user.image ? user.image : null, provider: "github" });

        user.name = newUser.name;
        const matchedUser = (await getFromMongo(client, "users", { email: email }))[0] as User;
        if (!matchedUser) {
          try {
            await postToMongo(client, "users", newUser);
          } catch (error) {
            throw new Error("Failed to Sign-up on the database.");
          }
        } else {
          try {
            // ========================== Update User Data on DB =============================
            const updateObj: any = {};
            if (!matchedUser.name) updateObj.name = newUser.name;

            // Check if current user image on database is not github image and is not default image
            if (matchedUser.image !== newUser.image && matchedUser.image !== defaultUserImg) {
              updateObj.image = newUser.image;
            }

            if (Object.keys(updateObj).length > 0) {
              updateObj.updatedAt = newUser.updatedAt;
              await updateInMongo(client, "users", { id: matchedUser.id }, { $set: updateObj });
            }

            // Extend session.user (CreatedAt, NeedPassword)
            const needPassword: boolean = !matchedUser.password && matchedUser.provider !== "credentials";
            returnValue = { ...user, createdAt: matchedUser.createdAt };
            returnValue.needPassword = needPassword;
            console.log("returnValue: ", returnValue);
            console.log("Additional User Data for Github Provider: ", newUser);
          } catch (error) {
            throw new Error("Failed to Update user on the database.");
          }
        }
      }
      return returnValue;
    }
  }
};
