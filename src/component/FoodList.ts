import { addFavoriteChangeListeners, addDeleteItemChangeListeners, addFilterChangeListeners } from "../managers/eventManagers.ts";
import { storeFoodItems } from "../managers/storageManagers.ts";
import FoodItem from "./FoodItem.ts";

type CategoryDropdownValue = "" | "한식" | "중식" | "일식" | "양식" | "아시안" | "기타";

interface FoodListOptions {
  foodItems: FoodItemType[];
}

export default class FoodList {
  #originFoodItems;
  #renderFoodItems;
  foodList;

  constructor({ foodItems }: FoodListOptions) {
    this.#originFoodItems = foodItems;
    this.#renderFoodItems = foodItems;

    this.foodList = document.createElement("ul");
    this.foodList.classList.add("restaurant-list");

    addFavoriteChangeListeners(this.updateFavoriteItem.bind(this));
    addDeleteItemChangeListeners(this.updateDeleteItem.bind(this));
    addFilterChangeListeners(this.updateFilterItem.bind(this));

    this.render();
  }

  get element() {
    return this.foodList;
  }

  render() {
    this.foodList.innerHTML = "";
    this.checkAndRenderEmptyList();
    const foodFragment = document.createDocumentFragment();

    this.#renderFoodItems.forEach((foodItem: FoodItemType) => {
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

  renderFavoriteItem() {}

  checkAndRenderEmptyList() {
    if (this.#originFoodItems.length === 0) {
      this.foodList.innerHTML = `
      <p class="empty-message">음식점이 없습니다. 우측 상단 버튼을 눌러 추가해 주세요.</p>
    `;

      return;
    }
    if (this.#renderFoodItems.length === 0) {
      this.foodList.innerHTML = `
        <p class="empty-message">즐겨찾기한 음식점이 없습니다.</p>
      `;

      return;
    }
  }

  addItem(foodItem: FoodItemType) {
    this.#originFoodItems = [...this.#originFoodItems, foodItem];
    this.#renderFoodItems = this.#originFoodItems;
    storeFoodItems(this.#originFoodItems);

    this.render();
  }

  filterFavoriteItem() {
    this.#renderFoodItems = this.#originFoodItems.filter((foodItem: FoodItemType) => foodItem.isFavorite);
    this.render();
  }

  resetFavoriteFilter() {
    this.#renderFoodItems = this.#originFoodItems;
    this.render();
  }

  updateFavoriteItem(id: string) {
    this.#originFoodItems = this.#originFoodItems.map((foodItem: FoodItemType) => {
      if (foodItem.id === id) {
        foodItem.isFavorite = !foodItem.isFavorite;
      }
      return foodItem;
    });
    this.render();
  }

  updateDeleteItem(id: string) {
    this.#originFoodItems = this.#originFoodItems.filter((foodItem: FoodItemType) => foodItem.id !== id);
    this.#renderFoodItems = this.#originFoodItems;
    this.render();
  }

  updateFilterItem(category: CategoryDropdownValue) {
    if (category === "") {
      this.#renderFoodItems = this.#originFoodItems;
      this.render();
      return;
    }
    console.log(category);
    this.#renderFoodItems = this.#originFoodItems.filter((foodItem) => foodItem.category === category);
    this.render();
  }
}
