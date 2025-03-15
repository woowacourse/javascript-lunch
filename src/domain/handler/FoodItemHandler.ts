import { FoodItem } from "../../component/FoodItem";
import { Modal } from "../../component/layout/Modal";
import { foodItems } from "../../mocks/foodItems";
import { FoodDetail } from "../../pages/FoodDetail";
import { FoodType } from "../../types/component/FoodItemType";

import {
  AddFoodItemType,
  ConvertStorageToLocalType,
  DeleteFoodItemType,
  HandleFavoriteButtonType,
  OpenDetailModalType,
  ReadFoodListType,
  ShowFoodItemType,
  SortedFoodListType,
} from "../../types/domain/FoodItemHandlerType";
import { getFormFoodItem } from "./FoodFormHandler";
import {
  deleteStorageFoodList,
  readStorageFoodList,
  updateStorageFoodList,
} from "./FoodStorageHandler";

// CRUD - create : mock Data
export function readFoodList({
  filter,
  favoriteFilter = false,
}: ReadFoodListType) {
  const previousFoodList = readStorageFoodList().filter((item: FoodType) => {
    if (favoriteFilter) return item.favorite === true;
    return item;
  });
  if (previousFoodList.length === 0 && !favoriteFilter) {
    localStorage.setItem("foodList", JSON.stringify(foodItems));
  }
  convertStorageToLocal({
    filter,
    foodList: sortedFoodList({ filter, foodList: previousFoodList }),
  });
}

// CRUD - update
export function addFoodFormItem(filter: AddFoodItemType) {
  const foodItem = getFormFoodItem();
  if (!foodItem) return;
  updateStorageFoodList(foodItem);
  Modal.close(filter);
}

// function addFoodItem(filter, newFoodItem) {
//   const updatedFoodList = updateStorageFoodList(newFoodItem);
//   Modal.close({ filter });
// }

export function deleteFoodItem({ filter, newFoodItem }: DeleteFoodItemType) {
  deleteStorageFoodList(newFoodItem);
  Modal.close({ filter });
}

export function sortedFoodList({ filter, foodList }: SortedFoodListType) {
  filter?.reset();
  return foodList.sort((a, b) => filter?.sortBy(a, b));
}

// 화면에 출력하기
export function convertStorageToLocal({
  filter = null,
  foodList,
}: ConvertStorageToLocalType) {
  const FoodItemListComponent = foodList.map((localFoodItem) => {
    const foodComponent = FoodItem({
      foodItem: localFoodItem,
      handleModal: (foodItem) => openDetailModal({ filter, foodItem }),
      handleFavoriteButton: (event, foodItem) =>
        handleFavoriteButton({ event, foodItem, filter }),
    });
    return foodComponent;
  });
  showFoodItem({ foodListComponent: FoodItemListComponent });
}

function openDetailModal({ filter, foodItem }: OpenDetailModalType) {
  Modal.setContent(FoodDetail(filter, foodItem));
  Modal.open();
}

function handleFavoriteButton({
  event,
  foodItem,
  filter,
}: HandleFavoriteButtonType) {
  const favoriteState = document.querySelector(
    ".tab-button_favorite.selected-button"
  );

  const newFoodItem = foodItem;
  newFoodItem.favorite = !foodItem.favorite;
  updateStorageFoodList(foodItem);

  if (favoriteState) {
    readFoodList({ filter, favoriteFilter: true });
  } else readFoodList({ filter, favoriteFilter: false });
  event.stopPropagation();
}

export function showFoodItem({ foodListComponent }: ShowFoodItemType) {
  const foodListContainer = document.querySelector(".restaurant-list");
  if (foodListContainer) foodListContainer.innerHTML = "";
  [...foodListComponent].forEach((item) => {
    foodListContainer?.appendChild(item);
  });
}
