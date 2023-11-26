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

export const nth = (d: number) => {
  if (d > 3 && d < 21) return "th";
  switch (d % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const day = date.getDate();
  const nthSuffix = nth(day);

  const monthYear = date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric"
  });

  const formattedDate = `${day + nthSuffix} ${monthYear}`;
  return formattedDate;
};

export function timeAgo(input: string | Date) {
  const date = input instanceof Date ? input : new Date(input);
  const formatter = new Intl.RelativeTimeFormat("en");
  const ranges = [
    ["years", 3600 * 24 * 365],
    ["months", 3600 * 24 * 30],
    ["weeks", 3600 * 24 * 7],
    ["days", 3600 * 24],
    ["hours", 3600],
    ["minutes", 60],
    ["seconds", 1]
  ] as const;
  const secondsElapsed = (date.getTime() - Date.now()) / 1000;

  for (const [rangeType, rangeVal] of ranges) {
    if (rangeVal < Math.abs(secondsElapsed)) {
      const delta = secondsElapsed / rangeVal;
      return formatter.format(Math.round(delta), rangeType);
    }
  }
  return "Just now";
}
