import { CATEGORIES, DISTANCES } from "../constants";
import { Category, Distance, Link } from "../types";

const isCategory = (category: unknown): category is Category => {
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

export { isCategory, isDistance, isLink };
