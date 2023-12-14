import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { isValid } from "./auth-valid/isValid";

export const cn = (...args: ClassValue[]) => twMerge(clsx(args));

export const sleep = (delay: number) => new Promise(resolve => setTimeout(resolve, delay * 1000));

/**
 * The function `validateMultipleInputs` takes an array of inputs and an array of validator names, and
 * returns an array of error messages for inputs that fail validation.
 * @param {string[]} inputs - An array of strings representing the inputs to be validated.
 * @param {string[]} validators - The `validators` parameter is an array of strings that represent the
 * names of validator functions. These validator functions are expected to be defined in an object
 * called `isValid`.
 * @returns The function `validateMultipleInputs` returns an array of strings.
 */
export const validateMultipleInputs = (inputs: string[], validators: string[]) => {
  return validators
    .map((validatorName, index) => {
      if (validatorName.includes("password")) validatorName = "password";
      if (validatorName === "image") validatorName = "path";
      const validatorFunction = isValid[validatorName as keyof typeof isValid];
      if (validatorFunction && typeof validatorFunction === "function") {
        const [err, msg] = validatorFunction(inputs[index]);
        return err ? msg : null;
      }
      return null;
    })
    .filter(Boolean) as string[];
};

/**
 * The function `kebabToCapitalized` takes a kebab-case string as input and converts it to a
 * capitalized string with each word separated by a space.
 * @param {string} input - The `input` parameter is a string that represents a kebab-case string.
 */
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

/**
 * The `formatDate` function takes a string or Date object and returns a formatted date string with the
 * day of the month with a suffix and month, year.
 * @param {string | Date} dateStr - The `dateStr` parameter can accept either a string or a Date
 * object. It represents the date that needs to be formatted.
 * @returns The `formatDate` function returns a formatted date string in the format "day + nthSuffix
 * monthYear" Ex. 27th May 2023.
 */
export const formatDate = (dateStr: string | Date) => {
  const date = dateStr instanceof Date ? dateStr : new Date(dateStr);
  const day = date.getDate();
  const nthSuffix = nth(day);

  const monthYear = date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric"
  });

  const formattedDate = `${day + nthSuffix} ${monthYear}`;
  return formattedDate;
};

/**
 * The `timeAgo` function takes a string or Date input and returns a formatted string representing the
 * time elapsed since the input.
 * @param {string | Date} input - The `input` parameter can be either a string or a Date object.
 * It represents the date and time to calculate the relative time from.
 * @returns a string representing the relative time difference between the input date and the current
 * date. It returns a string indicating how many years, months, weeks, days, hours, minutes, or seconds -
 * are remaining (if input date is in the future) or have passed (if input date is in the past).
 */
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
