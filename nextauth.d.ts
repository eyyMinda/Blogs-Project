import { DefaultSession, DefaultUser } from "next-auth";
// export enum Role {
//   user = "user",
//   admin = "admin"
// }
interface IUser extends DefaultUser {
  // /**
  //  * Role of user
  //  */
  // role?: Role;
  /**
   * Field to check when the user was created
   */
  createdAt?: string | Date;
  /**
   * Field to check whether a user needs to set a password due to OAuth login
   */
  needPassword?: boolean;
  /**
   * Field to check whether a user has verified their email
   */
  emailVerified?: boolean;
}
declare module "next-auth" {
  interface User extends IUser {}
  interface Session {
    user?: User;
  }
}
declare module "next-auth/jwt" {
  interface JWT extends IUser {}
}
