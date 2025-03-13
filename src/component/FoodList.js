import { storeFoodItems } from "../managers/storageManagers.ts";
import FoodItem from "./FoodItem.ts";

export default class FoodList {
  #foodItems;
  foodList;

  constructor({ foodItems }) {
    this.#foodItems = foodItems;
    this.foodList = document.createElement("ul");
    this.foodList.classList.add("restaurant-list");

    this.render();
  }

  render() {
    this.foodList.innerHTML = "";
    const foodFragment = document.createDocumentFragment();
    this.#foodItems.forEach((foodItem) => {
      foodFragment.appendChild(
        new FoodItem({
          id: foodItem.id,
          category: foodItem.category,
          name: foodItem.name,
          distance: foodItem.distance,
          description: foodItem.description,
          isFavorite: foodItem.isFavorite,
        }).element,
      );
    });
    this.foodList.appendChild(foodFragment);
  }

  addItem(foodItem) {
    this.#foodItems = [...this.#foodItems, foodItem];
    storeFoodItems(this.#foodItems);
    this.render();
  }

  get element() {
    return this.foodList;
  }
}
