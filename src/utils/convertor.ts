import { CategoryImgPath } from "./Constants";
import type { Category } from "../types/type";

export const categoryToSrc = (category: Category) =>
  `./${CategoryImgPath[category]}`;
