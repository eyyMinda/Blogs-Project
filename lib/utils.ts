import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...args: ClassValue[]) {
  return twMerge(clsx(args));
}

export const sleep = (delay: number) =>
  new Promise(resolve => setTimeout(resolve, delay * 1000));
