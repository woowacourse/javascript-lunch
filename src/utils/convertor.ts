import { CategoryImgPath } from "@/constant/Restaurant";
import { SelectAttribute, Category } from "@/type/type";

export const categoryToSrc = (category: Category) =>
  `./${CategoryImgPath[category]}`;

export const convertSelectAttribute = (attribute: SelectAttribute) =>
  Object.entries(attribute)
    .map(([key, value]) => `${key}=${value}`)
    .join(" ");

export const convertStringToNumber = (string: string) => {
  const numberPattern = /\d+/g;

  if (string.match(numberPattern)) {
    return string.match(numberPattern)?.map(Number)[0];
  }
};
