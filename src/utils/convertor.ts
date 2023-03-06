import { CategoryImgPath } from "@/constant/Restaurant";
import { Category } from "@/type/type";

export const categoryToSrc = (category: Category) =>
  `./${CategoryImgPath[category]}`;
