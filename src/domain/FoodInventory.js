import { FoodItem } from "../component/FoodItem";
import { Modal } from "../component/layout/Modal";
import { getInput } from "../util/getInput";
import { validateFoodItem } from "../validate/validateFoodItem";

export class FoodInventory {
  foodItems;

  constructor() {
    this.foodItems = this.#getPreviousFoodList();
  }

  #getPreviousFoodList() {
    const foodItems = document.querySelectorAll(".restaurant-list li");
    return foodItems;
  }

  #getFoodItem() {
    const foodItem = {
      category: getInput("category"),
      name: getInput("name"),
      distance: getInput("distance"),
      description: getInput("description"),
      link: getInput("link"),
    };

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

  #updateFoodList(foodItem) {
    this.foodItems = [...this.foodItems, foodItem];
    const foodListContainer = document.querySelector(".restaurant-list");
    foodListContainer.innerHTML = "";
    this.foodItems.forEach((item) => {
      foodListContainer.appendChild(item);
    });
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
    const FoodItemComponent = this.#getFoodItem();
    if (!FoodItemComponent) return;
    this.#updateFoodList(FoodItemComponent);
    Modal.close();
  }
}
