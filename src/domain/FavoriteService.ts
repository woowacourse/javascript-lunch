import { ChangeFavoriteStatusType } from "../types/domain/TabButtonHandlerType";
import { showConvertedItem, updateFoodList } from "./FoodService";

export function changeFavoriteStatus({
  event,
  foodItem,
  filter,
}: ChangeFavoriteStatusType) {
  const newFoodItem = foodItem;
  newFoodItem.favorite = !foodItem.favorite;
  updateFoodList({ foodItem });
  showConvertedItem({ filter, favoriteFilter: isFavoriteState() });
  event.stopPropagation();
}

export function isFavoriteState() {
  return (
    document
      .querySelector(".tab-button .tab-button_favorite")
      ?.classList.contains("selected-button") || false
  );
}
