class isValid {
  static fullname(str) {
    if (str === undefined || str.trim() === '') return [true, 'Fullname cannot be blank'];
    if (typeof str !== 'string') return [true, 'Fullname must be a string'];

    str = str.trim().replace(/\s+/g, ' ');
    const maxSize = 100;
    if (str.length > maxSize) return [true, `Fullname is too long, cannot exceed ${maxSize} characters`];
    const minWordsCount = 2;
    const minWordLength = 2;
    const minTextLength = minWordsCount * minWordLength + (minWordsCount - 1);
    const allowedSymbols = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const words = str.split(' ');

    if (str.length < minTextLength) return [true, `Too short, has to be atleast ${minTextLength} symbols`];
    if (words.length < minWordsCount) return [true, `Fullname consists of ${minWordsCount} or more words`];

    for (const word of words) {
      const otherLetters = word.slice(1);
      if (word.length < minWordLength) return [true, `All parts of the name must be atleast ${minWordLength} symbols`];
      if (word[0].toUpperCase() !== word[0]) return [true, `First letter of a word must be upper cased`];
      if (otherLetters.toLowerCase() !== otherLetters) return [true, `Other than first letters of a word must be lower cased`];
      if (word.split('').some(s => !allowedSymbols.includes(s))) return [true, `Symbol is not allowed "${s}"`];
    }
    return [false, 'OK'];
  }

  static name(str) {
    if (str === undefined || str.trim() === '') return [true, 'Name cannot be blank'];
    if (typeof str !== 'string') return [true, 'Name must be a string'];

    str = str.trim().replace(/\s+/g, ' ');
    const maxSize = 24;
    const minSize = 4;
    if (str.length > maxSize) return [true, `Name is too long, cannot exceed ${maxSize} characters`];
    if (str.length < minSize) return [true, `Name is too short, has to be atleast ${minSize} symbols`];

    if (str[0].toUpperCase() !== str[0]) return [true, `First letter of a name must be upper cased`];

    const allowedSymbols = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const invalidSymbol = str.split('').find(s => !allowedSymbols.includes(s));
    if (invalidSymbol) return [true, `Symbol is not allowed "${invalidSymbol}"`];

    return [false, 'OK'];
  }

  static email(str) {
    if (str === undefined || str.trim() === '') return [true, 'Email cannot be blank'];
    if (typeof str !== 'string') return [true, 'Email must be a string'];
    str = str.trim().replace(/\s+/g, ' ');
    // const regx = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/;  ///Full Regex email validation form

    const maxSize = 100;
    if (str.length > maxSize) return [true, `Email is too long, cannot exceed ${maxSize} characters`];
    const minWordLength = 10;
    const minLocaleLength = 3;
    const allowedSymbols = /^([a-zA-Z0-9\.])/;
    const parts = str.split('@');
    const [locale, domain] = parts;
    if (str.length < minWordLength) return [true, `Too short, email must be atleast ${minWordLength} symbols`];
    if (parts.length !== 2) return [true, 'Email must contain one @ symbol'];
    if (locale === '') return [true, 'Missing email name before @ symbol'];
    if (domain === '') return [true, 'Missing email domain after @ symbol'];
    if (locale.length < minLocaleLength) return [true, `Email name must be at least ${minLocaleLength} letters`];
    if (str.includes('..')) return [true, 'Email cannot contain 2 dots in a row'];
    if (locale[0] === '.' || !isNaN(+locale[0])) return [true, 'Email must start with a letter'];
    for (const s of locale) {
      if (!allowedSymbols.test(s)) return [true, `Email name includes a restricted symbol - ${s}`];
    };

    const domainParts = domain.split('.');
    if (domainParts.length === 1) return [true, 'Domain is incorrect. No dot (.) found after @ symbol'];
    if (domainParts[0] === '') return [true, 'Domain cannot start with a dot (.)'];
    if (domainParts[domainParts.length - 1].length < 2) return [true, 'Domain has to end with atleast 2 letters'];
    for (const s of domain) {
      if (!allowedSymbols.test(s)) return [true, `Email domain includes a restricted symbol ${s}`];
    };

    return [false, 'OK'];
  }

  static password(str) {
    const minPassLength = 8;
    if (str === undefined || str.trim() === '') return [true, 'Password cannot be blank'];
    if (typeof str !== 'string') return [true, 'Password must be a string'];
    str = str.trim().replace(/\s+/g, ' ');

    const maxSize = 120;
    if (str.length > maxSize) return [true, `Password is too long, cannot exceed ${maxSize} characters`];
    if (str.length < minPassLength) return [true, `Password is too short, must be atleast ${minPassLength} symbols`];

    return [false, 'OK'];
  }

  static text(str) {
    if (str === undefined || str.trim() === '') return [true, 'Text cannot be blank'];

    return [false, 'OK'];
  }
}

export { isValid };