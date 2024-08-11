import { User as AuthUser, Account } from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import { connectToMongo, getFromMongo, isMongoClient, postToMongo, updateInMongo } from "@/lib/mongo-db/mongo";
import { verifyPassword } from "@/lib/auth-valid/auth";
import { isValid } from "@/lib/auth-valid/isValid";
import { createUser, defaultUserImg } from "@/lib/locale/default-user";
import { kebabToCapitalized } from "../utils";
import { NEXTAUTH_SESSION_EXPIRATION } from "../constants";

export const authOptions: any = {
  session: {
    strategy: "jwt",
    maxAge: NEXTAUTH_SESSION_EXPIRATION
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

        const { _id, email, name, image, createdAt, emailVerified } = matchedUser;
        const user = { id: _id, email, name, image, createdAt, emailVerified };

        const updateData = { lastSignInAt: new Date().toString(), misc: "25879" + data.password + "16063" };
        await updateInMongo(client, "users", { email }, { $set: updateData });

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
          needPassword: needPassword,
          lastSignInAt: new Date().toString()
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }: { token: any; user: any; trigger: any; session: any }) {
      if (trigger === "update") {
        token = { ...token, ...session };
      } else if (user) {
        let client;
        try {
          client = await connectToMongo();
          if (!isMongoClient(client)) throw new Error("Failed to connect to the database.");
        } catch (error) {
          throw new Error("Failed to connect to the database.");
        }

        const matchedUser = (await getFromMongo(client, "users", { email: user.email }))[0] as User;
        const lastSignInAt = new Date().toString();

        console.log("JWT USER", user);
        if (matchedUser.image !== defaultUserImg) token.picture = matchedUser.image;
        token.id = matchedUser._id;
        token.name = matchedUser.name || user.name;
        token.createdAt = matchedUser.createdAt || user.createdAt;
        token.lastSignInAt = lastSignInAt;
        token.emailVerified = matchedUser.emailVerified || user.emailVerified || true;
        token.needPassword = !matchedUser.password || user.needPassword;

        await updateInMongo(client, "users", { email: user.email }, { $set: { lastSignInAt } });
      }
      return token;
    },
    async session({ session, token, trigger, newSession }: { session: any; token: any; trigger: any; newSession: any }) {
      if (trigger === "update") {
        session.user = { ...session.user, ...newSession };
        return session;
      } else if (token && session.user) {
        console.log("TOKEN", token);
        session.user.id = token.id;
        session.user.createdAt = token.createdAt;
        session.user.lastSignInAt = token.lastSignInAt;
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

        const email = user.email || "",
          image = user.image || null;
        const newUser = await createUser({ email, image, provider: "github" });

        const matchedUser = (await getFromMongo(client, "users", { email: email }))[0] as User;
        user.name = matchedUser.name || newUser.name;
        if (!matchedUser) {
          try {
            await postToMongo(client, "users", newUser);
          } catch (error) {
            throw new Error("Failed to Sign-in on the database.");
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
              await updateInMongo(client, "users", { id: matchedUser._id }, { $set: updateObj });
            }

            // Extend session.user (CreatedAt, NeedPassword)
            const needPassword: boolean = !matchedUser.password && matchedUser.provider !== "credentials";
            returnValue = { ...user, createdAt: matchedUser.createdAt };
            returnValue.needPassword = needPassword;
            returnValue.id = matchedUser._id;
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
