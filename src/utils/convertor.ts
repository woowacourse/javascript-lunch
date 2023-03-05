import { CategoryImgPath } from "@/constant/Constants";
import { Category } from "@/type/type";

export const categoryToSrc = (category: Category) =>
  `./${CategoryImgPath[category]}`;
