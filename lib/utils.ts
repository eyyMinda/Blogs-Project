import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { isValid } from "./auth-valid/isValid";
import { DatabasePost, Post } from "@/app/_types/PostType";
import { randomID } from "./auth-valid/auth";

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
 * @returns an array of: a string representing the relative time difference between the input date and the current
 * date. It returns a string indicating how many years, months, weeks, days, hours, minutes, or seconds -
 * are remaining (if input date is in the future) or have passed (if input date is in the past).
 * The second value is a number representing seconds elapsed since the input
 */
export function timeAgo(input: string | Date): [string, number] {
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
      return [formatter.format(Math.round(delta), rangeType), Math.round(Math.abs(secondsElapsed))];
    }
  }
  return ["Just now", Math.round(Math.abs(secondsElapsed))];
}

/**
 * Adds or removes a string value from an array based on the specified action.
 *
 * @param array - The array to be updated.
 * @param value - The string value to add or remove.
 * @param add - A boolean flag indicating whether to add (true) or remove (false) the value.
 * @returns The updated array with the value added or removed.
 */
export const toggleStringInArray = (array: string[], value: string, add: boolean): string[] => {
  return add ? [...array, value] : array.filter(curr => curr !== value);
};

/**
 * Compares two arrays of posts and identifies new or updated posts.
 *
 * This function takes two arrays of posts, `newPosts` and `oldPosts`. It compares the posts based on their `post_id`
 * and `date_updated` properties. If a post from `newPosts` is not found in `oldPosts` or has a more recent
 * `date_updated` property, it is considered new or updated and is added to the result array.
 *
 * @param {DatabasePost[]} newPosts - The array of new posts to compare.
 * @param {DatabasePost[]} oldPosts - The array of existing posts to compare against.
 * @returns {DatabasePost[]} An array containing posts that are new or have been updated.
 */
export const findUpdatedPosts = (newPosts: DatabasePost[], oldPosts: DatabasePost[]): DatabasePost[] => {
  const changes: DatabasePost[] = [];

  newPosts.forEach(newPost => {
    const oldPost = oldPosts.find(post => post.post_id === newPost.post_id);

    if (!oldPost || new Date(newPost.date_updated) > new Date(oldPost.date_updated)) {
      // New post, add to changes
      changes.push(newPost);
    }
  });

  return changes;
};

/**
 * The function `postsToDatabasePosts` converts an array of `Post` objects to an array of
 * database-friendly objects with selected properties.
 * @param {Post[]} posts - The `posts` parameter is an array of objects of type `Post`. Each `Post`
 * object contains the following properties:
 * @returns The `postsToDatabasePosts` function takes an array of `Post` objects as input and returns a
 * new array of objects with specific properties (`post_id`, `title`, `author`, `author_id`, `date`,
 * `date_updated`) extracted from each `Post` object in the input array.
 */
export const postsToDatabasePosts = (posts: Post[]) => {
  return posts.map(p => ({
    post_id: p.post_id,
    title: p.title,
    author: p.author,
    author_id: p.author_id,
    date: p.date,
    date_updated: p.date_updated
  })) as DatabasePost[];
};

/**
 * The function `createNewComment` creates a new comment object with specified properties and returns it.
 * @param {number} post_id - The `post_id` is the unique identifier of the post to which the comment belongs.
 * @param {string} username - The `username` refers to the name of the user who is posting the comment.
 * @param {string} email - The `email` refers the email of the user who is posting the comment.
 * @param {string} comment - Self explanatory
 * @returns An object is being returned with the following properties:
 * - _id: a randomly generated ID
 * - post_id: the provided post ID
 * - username: the provided username
 * - email: the provided email
 * - comment: the provided comment
 * - date: the current date and time converted to a string
 * - replies: an empty array
 * - likes: an empty array
 * - dislikes: an empty array
 */
export const createNewComment = (post_id: number, author_id: string, comment: string) => {
  return {
    _id: randomID(),
    post_id,
    author_id,
    comment,
    date: new Date().toISOString(),
    replies: [],
    likes: [],
    dislikes: []
  };
};
export const createNewCommentReply = (post_id: number, comment_id: string, author_id: string, comment: string, replied_to: string) => {
  return {
    _id: randomID(),
    post_id,
    comment_id,
    author_id,
    comment,
    date: new Date().toISOString(),
    likes: [],
    dislikes: [],
    replied_to
  };
};

export const validateReplyWithTag = (commentText: string, commentAuthorTag: string): boolean => {
  const trimmedComment = commentText.trim();
  return !!trimmedComment && (!trimmedComment.startsWith(commentAuthorTag) || trimmedComment.slice(commentAuthorTag.length).trim().length > 0);
};
export const formatReplyWithTag = (commentText: string, commentAuthorTag: string, replyDepth: boolean): string =>
  replyDepth && !commentText.startsWith(commentAuthorTag) ? `${commentAuthorTag} ${commentText.trim()}` : commentText.trim();

/**
 * The function sorts an array of comments based on different criteria.
 * @param {CommentType[]} commentsParam - An array of objects of type `CommentType`, which likely contains information about comments
 * such as the comment text, date, likes, and replies.
 * @param {SortOption} option - determines how the comments should be sorted. ("latest" | "oldest" | "popular")
 * @returns An array of `CommentType` objects sorted based on the specified `SortOption`.
 */
export const sortComments = (commentsParam: CommentWithUserType[], option: SortOption): CommentWithUserType[] => {
  if (!commentsParam) return [];
  let sortedComments = [...commentsParam];

  switch (option) {
    case "latest":
      sortedComments.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      break;
    case "oldest":
      sortedComments.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      break;
    case "popular":
      sortedComments.sort((a, b) => {
        const likeDifference = b.likes.length - a.likes.length; // Primary sort by likes

        if (likeDifference !== 0) return likeDifference;
        // Secondary sort by replies count if likes are the same
        return (b.replies?.length || 0) - (a.replies?.length || 0);
      });
      break;
  }
  return sortedComments;
};

/**
 * The function `getSortCriteria` returns sorting criteria based on the provided `SortOption`.
 * @param {SortOption} option - is a string that represents the sorting option chosen by the user.
 * It can have one of the following values: "latest", "oldest", or "popular".
 * @returns Object that contains the sorting criteria for the specified `option`.
 */
export const getSortCriteria = (option: SortOption) => {
  switch (option) {
    case "latest":
      return { date: -1 };
    case "oldest":
      return { date: 1 };
    case "popular":
      return {
        popularityScore: -1, // Sort by popularity score descending
        likesCount: -1, // Then sort by likes if scores are equal
        repliesCount: -1 // Then sort by replies if likes are equal
      };
    default:
      return { date: -1 };
  }
};
