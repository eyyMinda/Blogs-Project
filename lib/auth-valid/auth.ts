import { hash } from "bcryptjs";

export const hashPassword = async (password: string) => hash(password, 12);
