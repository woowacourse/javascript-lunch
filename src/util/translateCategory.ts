import { CATEGORY } from "../constant/variables";
import { CategoryType } from "../types/restaurant";

const translateCategory = (category: CategoryType): string => {
  if (category === CATEGORY.KOREAN) return "korean";
  if (category === CATEGORY.JAPANESE) return "japanese";
  if (category === CATEGORY.CHINESE) return "chinese";
  if (category === CATEGORY.ASIAN) return "asian";
  if (category === CATEGORY.AMERICAN) return "western";
  return "etc";
};

export default translateCategory;
