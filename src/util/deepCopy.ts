export const deepCopy = <T>(obj: T): T => {
  let result: Partial<T> = {};
  if (typeof obj === "object" && obj !== null) {
    for (const key in obj) {
      result[key] = deepCopy(obj[key]);
    }
  } else {
    result = obj;
  }
  return result as T;
};
