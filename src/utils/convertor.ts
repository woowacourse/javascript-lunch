import { CategoryImgPath } from "@/constant/Restaurant";
import { Attribute, Category } from "@/type/type";

export const categoryToSrc = (category: Category) =>
  `./${CategoryImgPath[category]}`;

export const convertHtmlAttribute = (attribute: Attribute) =>
  Object.entries(attribute)
    .map(([key, value]) => `${key}=${value}`)
    .join(" ");
