import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { validatorsMap } from "./isValid";

export const cn = (...args: ClassValue[]) => twMerge(clsx(args));

export const sleep = (delay: number) => new Promise(resolve => setTimeout(resolve, delay * 1000));

export const validateMultipleInputs = (inputs: string[], validators: (keyof typeof validatorsMap)[]) => {
  return inputs
    .map((input, index) => {
      const validatorName = validators[index];
      const validator = validatorsMap[validatorName];
      const [err, msg] = validator(input);
      return err ? msg : null;
    })
    .filter(Boolean);
};
