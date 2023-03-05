import { CategoryImgPath } from "./Constants";
import { Category } from "../types/type";

export const categoryToSrc = (category: Category) =>
  `./${CategoryImgPath[category]}`;
