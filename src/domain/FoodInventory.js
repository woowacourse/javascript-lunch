import { FoodItem } from "../component/FoodItem";
import { Modal } from "../component/layout/Modal";
import { getInput } from "./getInput";
import { validateFoodItem } from "../validate/validateFoodItem";
import { FoodItemHandler } from "./FoodItemHandler";

export class FoodInventory {
  foodItems;

  constructor(foodItems) {
    this.foodItems = foodItems;
  }

  #createFoodItem() {
    const foodItem = FoodItemHandler.getFoodItem();
    const { imgSrc, imgAlt } = this.#getImgSrcAlt(foodItem.category);
    try {
      validateFoodItem(foodItem);
      return FoodItem({
        imgSrc,
        imgAlt,
        name: foodItem.name,
        distance: foodItem.distance,
        description: foodItem.description,
        link: foodItem.link,
      });
    } catch (error) {
      return;
    }
  }

  #getImgSrcAlt(category) {
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

  addFoodItem() {
    const FoodItemComponent = this.#createFoodItem();
    if (!FoodItemComponent) return;
    this.foodItems = [...this.foodItems, FoodItemComponent];
    FoodItemHandler.updateFoodList([...this.foodItems, FoodItemComponent]);
    Modal.close();
  }
}
