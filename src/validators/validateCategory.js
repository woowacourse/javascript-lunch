import { RESTAURANT_RULES } from "../constants/rules.js";
import throwError from "./throwError.js";

const validateCategory = (category) => {
  throwError({
    condition: !category.trim(),
    message: "카테고리를 선택해주세요.",
  });

  throwError({
    condition: !RESTAURANT_RULES.CATEGORIES.includes(category),
    message: `카테고리는 ${RESTAURANT_RULES.CATEGORIES.join(
      ", "
    )} 중 하나여야 합니다.`,
  });
};

export default validateCategory;
