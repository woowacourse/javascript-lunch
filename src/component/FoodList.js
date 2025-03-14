import { addFavoriteChangeListeners } from "../managers/eventManagers.ts";
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

    addFavoriteChangeListeners(this.updateFavoriteItem.bind(this));

    this.render();
  }

  render() {
    this.foodList.innerHTML = "";
    if (this.#originFoodItems.length === 0) {
      this.foodList.innerHTML = `
      <p class="empty-message">음식점이 없습니다. 우측 상단 버튼을 눌러 추가해 주세요.</p>
    `;

      return;
    }
    if (this.#filteredFoodItems.length === 0) {
      this.foodList.innerHTML = `
        <p class="empty-message">즐겨찾기한 음식점이 없습니다.</p>
      `;

      return;
    }
    const foodFragment = document.createDocumentFragment();
    this.#filteredFoodItems.forEach((foodItem) => {
      foodFragment.appendChild(
        new FoodItem({
          data: foodItem,
          cssType: "row",
        }).element,
      );
    });
    this.foodList.appendChild(foodFragment);
  }

  addItem(foodItem) {
    this.#originFoodItems = [...this.#originFoodItems, foodItem];
    this.#filteredFoodItems = this.#originFoodItems;
    storeFoodItems(this.#originFoodItems);

    this.render();
  }

  updateFavoriteItem(id) {
    this.#originFoodItems = this.#originFoodItems.map((foodItem) => {
      if (foodItem.id === id) {
        foodItem.isFavorite = !foodItem.isFavorite;
      }

      return foodItem;
    });
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
