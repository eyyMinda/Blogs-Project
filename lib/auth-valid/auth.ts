import { compare, hash } from "bcryptjs";

export const hashPassword = async (password: string) => hash(password, 12);

export const verifyPassword = async (password: string, hashedPassword: string) => compare(password, hashedPassword);

export const newRandUsername = () => "user_" + Math.floor(Math.random() * 100000000000000);
