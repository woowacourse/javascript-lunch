import { CategoryImgPath } from "@/constant/Restaurant";
import { SelectAttribute, Category } from "@/type/type";

export const categoryToSrc = (category: Category) =>
  `./${CategoryImgPath[category]}`;

export const convertSelectAttribute = (attribute: SelectAttribute) =>
  Object.entries(attribute)
    .map(([key, value]) => `${key}=${value}`)
    .join(" ");
