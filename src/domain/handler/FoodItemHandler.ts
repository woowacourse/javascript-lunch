import { FoodItem } from "../../component/FoodItem";
import { Modal } from "../../component/layout/Modal";
import { foodItems } from "../../mocks/foodItems";
import { FoodDetail } from "../../pages/FoodDetail";
import { FoodType } from "../../types/component/FoodItemType";

import {
  AddFoodItemType,
  ConvertStorageToLocalType,
  DeleteFoodItemType,
  OpenDetailModalType,
  ReadFoodListType,
  ShowConvertedItemType,
  ShowFoodItemType,
  UpdateFoodListType,
} from "../../types/domain/FoodItemHandlerType";
import { getFormFoodItem } from "./FoodFormHandler";
import {
  deleteStorageFoodList,
  readStorageFoodList,
  updateStorageFoodList,
} from "./FoodStorageHandler";
import { handleTabButton } from "./TabButtonHandler";

// CRUD - create : mock Data
export function readFoodList({ favoriteFilter }: ReadFoodListType) {
  const previousFoodList = readStorageFoodList().filter((item: FoodType) => {
    if (favoriteFilter) return item.favorite === true;
    return item;
  });
  if (previousFoodList.length === 0 && !favoriteFilter) {
    localStorage.setItem("foodList", JSON.stringify(foodItems));
  }
  return previousFoodList;
}

// CRUD - update
export function addFoodFormItem({ filter }: AddFoodItemType) {
  const foodItem = getFormFoodItem();
  if (!foodItem) return;
  updateStorageFoodList({ newFoodItem: foodItem });
  Modal.close({ filter });
}

export function updateFoodList({ foodItem }: UpdateFoodListType) {
  updateStorageFoodList({ newFoodItem: foodItem });
}

export function deleteFoodItem({ filter, newFoodItem }: DeleteFoodItemType) {
  deleteStorageFoodList({ newFoodItem });
  Modal.close({ filter });
}

// FoodItem-Data 관련 부가적인 기능

// 화면에 보여주기
export function convertStorageToLocal({
  filter,
  foodList,
}: ConvertStorageToLocalType) {
  const FoodItemListComponent = foodList.map((localFoodItem) => {
    const foodComponent = FoodItem({
      foodItem: localFoodItem,
      handleModal: (foodItem) => openDetailModal({ filter, foodItem }),
      handleTabButton: (event, foodItem) =>
        handleTabButton({ event, foodItem, filter }),
    });
    return foodComponent;
  });
  showFoodItem({ foodListComponent: FoodItemListComponent || [] });
}

function openDetailModal({ filter, foodItem }: OpenDetailModalType) {
  Modal.setContent({
    modalContent: FoodDetail({ filter, foodDetailItem: foodItem }),
  });
  Modal.open();
}

export function showConvertedItem({
  favoriteFilter,
  filter,
}: ShowConvertedItemType) {
  const previousFoodList = readFoodList({ favoriteFilter });
  convertStorageToLocal({
    filter,
    foodList: filter.sortedFoodList({ foodList: previousFoodList }),
  });
}

export function showFoodItem({ foodListComponent }: ShowFoodItemType) {
  const foodListContainer = document.querySelector(".restaurant-list");
  if (foodListContainer) foodListContainer.innerHTML = "";
  [...foodListComponent].forEach((item) => {
    foodListContainer?.appendChild(item);
  });
}
