import { removeStoredFoodItem, storeFoodItems } from "../../managers/storageManagers.ts";
import { FoodItemType } from "../../types/food.ts";
import { filterFoodItemsByCategory } from "./util/filterFoodItems.ts";
import { sortFoodItem } from "./util/sortFoodItem.ts";

export default class FoodListManager {
  #foodItems: FoodItemType[];

  #selectedFilter: string = "";
  #selectedSortType: string = "이름순";
  #currentMenu: string = "all";

  constructor(initialFoodItems: FoodItemType[]) {
    this.#foodItems = initialFoodItems;
  }

  getItems() {
    return [...this.#foodItems];
  }

  setFilterType(category: string) {
    this.#selectedFilter = category;
  }

  setSortType(sortType: string) {
    this.#selectedSortType = sortType;
  }

  setCurrentMenu(currentMenu: string) {
    this.#currentMenu = currentMenu;
  }

  processFoodItems() {
    const filteredFavoriteFoodItems = this.filterFavoriteFoodItems(this.#currentMenu);
    const filteredFoodItems = filterFoodItemsByCategory(this.#selectedFilter, filteredFavoriteFoodItems);
    return sortFoodItem(this.#selectedSortType, filteredFoodItems);
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
    let favoriteFoodItems;
    if (tabMenu === "favorite") {
      favoriteFoodItems = this.#foodItems.filter((foodItem) => foodItem.isFavorite);
      return favoriteFoodItems;
    }
    return [...this.#foodItems];
  }
}
