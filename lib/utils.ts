import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { isValid } from "./isValid";

export const cn = (...args: ClassValue[]) => twMerge(clsx(args));

export const sleep = (delay: number) => new Promise(resolve => setTimeout(resolve, delay * 1000));

export const validateMultipleInputs = (inputs: string[], validators: string[]) => {
  return validators
    .map((validatorName, index) => {
      const validatorFunction = isValid[validatorName as keyof typeof isValid];
      if (validatorFunction && typeof validatorFunction === "function") {
        const [err, msg] = validatorFunction(inputs[index]);
        return err ? msg : null;
      }
      return null;
    })
    .filter(Boolean) as string[];
};
