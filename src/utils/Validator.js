const ValidationUtils = {
  isEmpty: (string) => string.trim().length === 0,
  isValidArrayLength: (array, min, max) =>
    array.length < min || array.length > max,
  isValidStringLength: (string, max) => string.length > max,
  isValidURL: (string) => string.trim().slice(0, 8) !== "https://",
};

const Validator = {
  category: (string) => {
    const errorResults = [ValidationUtils.isEmpty(string)];
    return errorResults.some((error) => error === true);
  },
  storeName: (string) => {
    const errorResults = [
      ValidationUtils.isValidStringLength(string, 14),
      ValidationUtils.isEmpty(string),
    ];
    return errorResults.some((error) => error === true);
  },
  location: (string) => {
    const errorResults = [ValidationUtils.isEmpty(string)];
    return errorResults.some((error) => error === true);
  },
  description: (string) => {
    const errorResults = [ValidationUtils.isValidStringLength(string, 255)];
    return errorResults.some((error) => error === true);
  },
  reference: (string) => {
    const errorResults = [ValidationUtils.isValidURL(string)];
    return errorResults.some((error) => error === true);
  },
};

export default Validator;
