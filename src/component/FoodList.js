import { getImgSrcAlt } from "../util/getImgSrcAlt.js";
import { FoodItem } from "./FoodItem.js";

export default class FoodList {
  constructor({ foodItems }) {
    this.foodItems = foodItems;
    this.foodList = document.createElement("ul");
    this.foodList.classList.add("restaurant-list");

    const foodFragment = document.createDocumentFragment();

    foodItems.forEach((foodItem) => {
      foodFragment.appendChild(
        FoodItem({
          category: foodItem.category,
          name: foodItem.name,
          distance: foodItem.distance,
          description: foodItem.description,
        })
      );
    });

    this.foodList.appendChild(foodFragment);
  }
  get element() {
    return this.foodList;
  }
}
