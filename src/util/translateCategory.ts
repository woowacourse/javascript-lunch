import { CATEGORY, CATEGORY_ENG } from "../constants";
import "../types/restaurant";

const translateCategory = (category: Category): string => {
  if (category === CATEGORY.KOREAN) return CATEGORY_ENG.KOREAN;
  if (category === CATEGORY.JAPANESE) return CATEGORY_ENG.JAPANESE;
  if (category === CATEGORY.CHINESE) return CATEGORY_ENG.CHINESE;
  if (category === CATEGORY.ASIAN) return CATEGORY_ENG.ASIAN;
  if (category === CATEGORY.WESTERN) return CATEGORY_ENG.WESTERN;
  return CATEGORY_ENG.ETC;
};

export default translateCategory;
