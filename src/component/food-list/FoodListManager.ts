import { removeStoredFoodItem, storeFoodItems } from "../../managers/storageManagers.ts";

export default class FoodListManager {
  #foodItems: FoodItemType[];

  constructor(initialFoodItems: FoodItemType[]) {
    this.#foodItems = initialFoodItems;
  }

  getItems() {
    return [...this.#foodItems];
  }

  addItem(foodItem: FoodItemType) {
    this.#foodItems = [...this.#foodItems, foodItem];
    storeFoodItems(this.#foodItems);
  }

  deleteFoodItem(id: string) {
    removeStoredFoodItem(id);
    this.#foodItems = this.#foodItems.filter((foodItem) => foodItem.id !== id);
    storeFoodItems(this.#foodItems);
  }

  toggleFavoriteFoodItem(id: string) {
    this.#foodItems = this.#foodItems.map((foodItem) => {
      if (foodItem.id === id) {
        return { ...foodItem, isFavorite: !foodItem.isFavorite };
      }
      return foodItem;
    });
    storeFoodItems(this.#foodItems);
  }

  filterFavoriteFoodItems(tabMenu: string) {
    if (tabMenu === "favorite") {
      return this.#foodItems.filter((foodItem) => foodItem.isFavorite);
    }
    return [...this.#foodItems];
  }
}
