import { compare, hash } from "bcryptjs";
import { v4 } from "uuid";

export const hashPassword = async (password: string) => hash(password, 12);

export const verifyPassword = async (password: string, hashedPassword: string) => compare(password, hashedPassword);

export const newRandUsername = () => "user_" + Math.floor(Math.random() * 1000000000000);

export const randomID = () => v4();
