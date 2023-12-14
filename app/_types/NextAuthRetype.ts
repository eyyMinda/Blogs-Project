import { Session } from "next-auth";

export type SessionType = Session;
export type UpdateSession = (data?: any) => Promise<Session | null>;
