import { HandleFavoriteButtonType } from "../../types/domain/TabButtonHandlerType";
import { showConvertedItem } from "./FoodItemHandler";
import { updateStorageFoodList } from "./FoodStorageHandler";

export function handleTabButton({
  event,
  foodItem,
  filter,
}: HandleFavoriteButtonType) {
  const favoriteState = document.querySelector(
    ".tab-button_favorite.selected-button"
  );

  const newFoodItem = foodItem;
  newFoodItem.favorite = !foodItem.favorite;
  updateStorageFoodList({ newFoodItem: foodItem });

  if (favoriteState) {
    showConvertedItem({ filter, favoriteFilter: true });
  } else {
    showConvertedItem({ filter, favoriteFilter: false });
  }
  event.stopPropagation();
}

export function isFavoriteState() {
  return (
    document
      .querySelector(".tab-button .tab-button_favorite")
      ?.classList.contains("selected-button") || false
  );
}
