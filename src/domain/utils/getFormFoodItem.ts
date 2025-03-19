import { Category } from "../../types/domain/GetFormFoodItemType";
import { ValidateFoodItemType } from "../../types/vaildate/ValidateFoodItemType";
import { getInput } from "./getInput";
import { validateFoodItem } from "../../validate/validateFoodItem";

export function getFormFoodItem() {
  const foodItem: ValidateFoodItemType = {
    category: getInput({ name: "category" }) as Category,
    name: getInput({ name: "name" }),
    distance: getInput({ name: "distance" }),
    description: getInput({ name: "description" }),
    link: getInput({ name: "link" }),
  };

  const { imgSrc, imgAlt } = getImgSrcAlt(foodItem.category);
  try {
    validateFoodItem(foodItem);
    return {
      imgSrc,
      imgAlt,
      name: foodItem.name,
      distance: foodItem.distance,
      description: foodItem.description,
      link: foodItem.link,
      favorite: false,
    };
  } catch (error) {
    return;
  }
}

function getImgSrcAlt(category: Category) {
  const categoryMap = {
    한식: { imgAlt: "한식", imgSrc: "./category-korean.png" },
    중식: { imgAlt: "중식", imgSrc: "./category-chinese.png" },
    일식: { imgAlt: "일식", imgSrc: "./category-japanese.png" },
    양식: { imgAlt: "양식", imgSrc: "./category-western.png" },
    아시안: { imgAlt: "아시안", imgSrc: "./category-asian.png" },
  };
  return (
    categoryMap[category] || { imgAlt: "기타", imgSrc: "./category-etc.png" }
  );
}
