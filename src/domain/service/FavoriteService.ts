import { ChangeFavoriteStatusType } from "../../types/domain/FavoriteServiceType";
import { showConvertedItem, updateFoodList } from "./FoodService";

export function changeFavoriteStatus({
  event,
  foodItem,
}: ChangeFavoriteStatusType) {
  const newFoodItem = foodItem;
  newFoodItem.favorite = !foodItem.favorite;
  updateFoodList({ foodItem });
  showConvertedItem({ favoriteFilter: favoriteState() });
  event.stopPropagation();
}

export function favoriteState() {
  return (
    document
      .querySelector(".tab-button .tab-button_favorite")
      ?.classList.contains("selected-button") || false
  );
}
