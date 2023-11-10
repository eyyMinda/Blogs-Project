export class isValid {
  static fullname(str: string): [boolean, string] {
    if (str === undefined || str.trim() === "") return [true, "Fullname cannot be blank"];
    if (typeof str !== "string") return [true, "Fullname must be a string"];

    str = str.trim().replace(/\s+/g, " ");
    const maxSize: number = 100;
    if (str.length > maxSize) return [true, `Fullname is too long, cannot exceed ${maxSize} characters`];
    const minWordsCount: number = 2;
    const minWordLength: number = 2;
    const minTextLength: number = minWordsCount * minWordLength + (minWordsCount - 1);
    const allowedSymbols: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const words: string[] = str.split(" ");

    if (str.length < minTextLength) return [true, `Too short, has to be at least ${minTextLength} symbols`];
    if (words.length < minWordsCount) return [true, `Fullname consists of ${minWordsCount} or more words`];

    for (const word of words) {
      const otherLetters: string = word.slice(1);
      if (word.length < minWordLength) return [true, `All parts of the name must be at least ${minWordLength} symbols`];
      if (word[0].toUpperCase() !== word[0]) return [true, `First letter of a word must be upper cased`];
      if (otherLetters.toLowerCase() !== otherLetters) return [true, `Other than first letters of a word must be lower cased`];
      for (const s of word) {
        if (!allowedSymbols.includes(s)) return [true, `Email name includes a restricted symbol - ${s}`];
      }
    }
    return [false, "OK"];
  }

  static username(str: string): [boolean, string] {
    if (str === undefined || str.trim() === "") return [true, "User name cannot be blank"];
    if (typeof str !== "string") return [true, "User name must be a string"];

    str = str.trim().replace(/\s+/g, " ");
    const maxSize: number = 24;
    const minSize: number = 4;
    if (str.length > maxSize) return [true, `User name is too long, cannot exceed ${maxSize} characters`];
    if (str.length < minSize) return [true, `User name is too short, has to be at least ${minSize} symbols`];

    const allowedSymbols: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const invalidSymbol: string | undefined = str.split("").find(s => !allowedSymbols.includes(s));
    if (invalidSymbol) return [true, `Symbol is not allowed "${invalidSymbol}"`];

    return [false, "OK"];
  }

  static email(str: string): [boolean, string] {
    if (str === undefined || str.trim() === "") return [true, "Email cannot be blank"];
    if (typeof str !== "string") return [true, "Email must be a string"];
    str = str.trim().replace(/\s+/g, " ");
    // const regx = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/;  ///Full Regex email validation form

    const maxSize: number = 100;
    if (str.length > maxSize) return [true, `Email is too long, cannot exceed ${maxSize} characters`];
    const minWordLength: number = 10;
    const minLocaleLength: number = 3;
    const allowedSymbols: RegExp = /^([a-zA-Z0-9\.])/;
    const parts: string[] = str.split("@");
    const [locale, domain]: string[] = parts;
    if (str.length < minWordLength) return [true, `Too short, email must be at least ${minWordLength} symbols`];
    if (parts.length !== 2) return [true, "Email must contain one @ symbol"];
    if (locale === "") return [true, "Missing email name before @ symbol"];
    if (domain === "") return [true, "Missing email domain after @ symbol"];
    if (locale.length < minLocaleLength) return [true, `Email name must be at least ${minLocaleLength} letters`];
    if (str.includes("..")) return [true, "Email cannot contain 2 dots in a row"];
    if (locale[0] === "." || !isNaN(+locale[0])) return [true, "Email must start with a letter"];
    for (const s of locale) {
      if (!allowedSymbols.test(s)) return [true, `Email name includes a restricted symbol - ${s}`];
    }

    const domainParts: string[] = domain.split(".");
    if (domainParts.length === 1) return [true, "Domain is incorrect. No dot (.) found after @ symbol"];
    if (domainParts[0] === "") return [true, "Domain cannot start with a dot (.)"];
    if (domainParts[domainParts.length - 1].length < 2) return [true, "Domain has to end with at least 2 letters"];
    for (const s of domain) {
      if (!allowedSymbols.test(s)) return [true, `Email domain includes a restricted symbol ${s}`];
    }

    return [false, "OK"];
  }

  static password(str: string): [boolean, string] {
    const minPassLength: number = 8;
    if (str === undefined || str.trim() === "") return [true, "Password cannot be blank"];
    if (typeof str !== "string") return [true, "Password must be a string"];
    str = str.trim().replace(/\s+/g, " ");

    const maxSize: number = 120;
    if (str.length > maxSize) return [true, `Password is too long, cannot exceed ${maxSize} characters`];
    if (str.length < minPassLength) return [true, `Password is too short, must be at least ${minPassLength} symbols`];

    return [false, "OK"];
  }

  static text(str: string): [boolean, string] {
    if (str === undefined || str.trim() === "") return [true, "Text cannot be blank"];
    const minSize: number = 12;
    if (str.length < minSize) return [true, `Text is too short, has to be at least ${minSize} symbols`];

    return [false, "OK"];
  }
}
