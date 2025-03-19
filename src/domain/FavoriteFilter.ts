import { ToggleStatusType } from "../types/domain/FavoriteFilterType";
import { showConvertedItem, updateFoodList } from "./service/FoodService";

class FavoriteFilter {
  static instance: FavoriteFilter;
  isFavorite: boolean;

  constructor() {
    this.isFavorite = false;
  }

  static getInstance(): FavoriteFilter {
    if (!FavoriteFilter.instance) {
      FavoriteFilter.instance = new FavoriteFilter();
    }
    return FavoriteFilter.instance;
  }

  toggleStatus({ event, foodItem }: ToggleStatusType) {
    console.log(this.isFavorite);
    const newFoodItem = foodItem;
    newFoodItem.favorite = !foodItem.favorite;
    updateFoodList({ foodItem });
    showConvertedItem({ isFavoriteFilterActive: this.currentStatus() });
    event.stopPropagation();
  }

  toggleFilter({
    cuttentButton,
    previousButton,
  }: {
    cuttentButton: Element;
    previousButton: Element;
  }) {
    if (cuttentButton.classList.contains("selected-button")) return;
    cuttentButton.classList.toggle("selected-button");
    previousButton.classList.remove("selected-button");
    this.isFavorite = !this.isFavorite;
    showConvertedItem({ isFavoriteFilterActive: this.isFavorite });
  }

  currentStatus() {
    return this.isFavorite;
  }
}

export const favoriteFilter = FavoriteFilter.getInstance();
