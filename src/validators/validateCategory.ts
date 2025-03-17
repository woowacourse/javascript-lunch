import { CATEGORY_META, Restaurant } from "../entities";
import throwError from "./throwError.js";

const validateCategory = (category: Restaurant["category"]) => {
  throwError({
    condition: !category.trim(),
    message: "카테고리를 선택해주세요.",
  });

  throwError({
    condition: !Object.keys(CATEGORY_META).includes(category),
    message: `카테고리는 ${Object.values(CATEGORY_META).join(
      ", "
    )} 중 하나여야 합니다.`,
  });
};

export default validateCategory;
