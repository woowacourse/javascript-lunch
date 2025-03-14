import { addFavoriteChangeListeners, addDeleteItemChangeListeners } from "../managers/eventManagers.ts";
import { storeFoodItems } from "../managers/storageManagers.ts";
import FoodItem from "./FoodItem.ts";

interface FoodListOptions {
  foodItems: FoodItemType[];
}

export default class FoodList {
  #originFoodItems;
  #filteredFoodItems;
  foodList;

  constructor({ foodItems }: FoodListOptions) {
    this.#originFoodItems = foodItems;
    this.#filteredFoodItems = foodItems;

    this.foodList = document.createElement("ul");
    this.foodList.classList.add("restaurant-list");

    addFavoriteChangeListeners(this.updateFavoriteItem.bind(this));
    addDeleteItemChangeListeners(this.updateDeleteItem.bind(this));

    this.render();
  }

  get element() {
    return this.foodList;
  }

  render() {
    this.foodList.innerHTML = "";
    this.checkAndRenderEmptyList();
    const foodFragment = document.createDocumentFragment();

    this.#filteredFoodItems.forEach((foodItem: FoodItemType) => {
      const foodItemElement = new FoodItem({
        data: foodItem,
        cssType: "row",
      }).element;
      if (foodItemElement) {
        foodFragment.appendChild(foodItemElement);
      }
    });
    this.foodList.appendChild(foodFragment);
  }

  checkAndRenderEmptyList() {
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
  }

  addItem(foodItem: FoodItemType) {
    this.#originFoodItems = [...this.#originFoodItems, foodItem];
    this.#filteredFoodItems = this.#originFoodItems;
    storeFoodItems(this.#originFoodItems);

    this.render();
  }

  filterFavoriteItem() {
    this.#filteredFoodItems = this.#originFoodItems.filter((foodItem: FoodItemType) => foodItem.isFavorite);
    this.render();
  }

  resetFilter() {
    this.#filteredFoodItems = this.#originFoodItems;
    this.render();
  }

  updateFavoriteItem(id: string) {
    this.#originFoodItems = this.#originFoodItems.map((foodItem: FoodItemType) => {
      if (foodItem.id === id) {
        foodItem.isFavorite = !foodItem.isFavorite;
      }

      return foodItem;
    });
  }

  updateDeleteItem(id: string) {
    this.#originFoodItems = this.#originFoodItems.filter((foodItem: FoodItemType) => foodItem.id !== id);
    this.#filteredFoodItems = this.#originFoodItems;
    this.render();
  }
}
