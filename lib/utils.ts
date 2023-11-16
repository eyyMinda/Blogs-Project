import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { isValid } from "./auth-valid/isValid";

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

export const kebabToCapitalized = (input: string): string =>
  input
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const removeBlankCharacters = (str: string): string => str.replace(/\s/g, "");
/**
 * The `trimObjectValues` function trims whitespace and any blank characters from the values of an object,
 * excluding specified keys.
 * @param {DataObject} data - The `data` parameter is an object that contains key-value pairs.
 * @param {string[]} excludeKeys - `excludeKeys` is an optional parameter that allows you to specify an
 * array of keys that should be excluded from the trimming process. The values corresponding to these
 * keys will not be trimmed.
 */
export const trimObjectValues = (data: DataObject, excludeKeys: string[] = []): DataObject =>
  Object.fromEntries(
    Object.entries(data).map(([key, value]) => {
      return excludeKeys.includes(key) ? [key, value] : [key, removeBlankCharacters(value).trim()];
    })
  );
