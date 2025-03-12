import { getImgSrcAlt } from "../util/getImgSrcAlt.js";
import { FoodItem } from "./FoodItem.js";

export default class FoodList {
  constructor({ foodItems }) {
    this.foodItems = foodItems;
    this.foodList = document.createElement("ul");
    this.foodList.classList.add("restaurant-list");

    this.render();
  }
  render() {
    this.foodList.innerHTML = "";
    const foodFragment = document.createDocumentFragment();
    this.foodItems.forEach((foodItem) => {
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
  addItem(foodItem) {
    this.foodItems = [...this.foodItems, foodItem];
    localStorage.setItem("foodItem", JSON.stringify(this.foodItems));
    this.render();
  }
  get element() {
    return this.foodList;
  }
}
