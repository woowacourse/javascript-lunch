import { CATEGORIES, DISTANCES } from "../constants";
import { Category, Distance, Link } from "../types";

const deepCopy = <T>(obj: T): T => {
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

const isCategory = (category: unknown): category is Category => {
  if (typeof category !== "string") {
    throw new Error("카테고리가 잘못된 타입입니다");
  }
  return CATEGORIES.some((c) => c === category);
};

const isDistance = (distance: unknown): distance is Distance => {
  return DISTANCES.some((c) => c === distance);
};

const isLink = (value: any): value is Link => {
  return (
    typeof value === "string" &&
    (value.startsWith("https://") || value.startsWith("http://"))
  );
};

export { deepCopy, isCategory, isDistance, isLink };
