import { storeFoodItems } from "../managers/storageManagers.ts";
import FoodItem from "./FoodItem.ts";

export default class FoodList {
  #originFoodItems;
  #filteredFoodItems;
  foodList;

  constructor({ foodItems }) {
    this.#originFoodItems = foodItems;
    this.#filteredFoodItems = foodItems;
    this.foodList = document.createElement("ul");
    this.foodList.classList.add("restaurant-list");

    this.render();
  }

  render() {
    this.foodList.innerHTML = "";
    const foodFragment = document.createDocumentFragment();
    this.#filteredFoodItems.forEach((foodItem) => {
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
    this.#originFoodItems = [...this.#originFoodItems, foodItem];
    storeFoodItems(this.#originFoodItems);
    this.render();
  }

  filterFavoriteItem() {
    this.#filteredFoodItems = this.#originFoodItems.filter((foodItem) => foodItem.isFavorite);
    this.render();
  }

  resetFilter() {
    this.#filteredFoodItems = this.#originFoodItems;
    this.render();
  }

  get element() {
    return this.foodList;
  }
}
