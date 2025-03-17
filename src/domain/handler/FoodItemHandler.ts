import { FoodItem } from "../../component/FoodItem";
import { Modal } from "../../component/layout/Modal";
import { foodItems } from "../../mocks/foodItems";
import { FoodDetail } from "../../pages/FoodDetail";
import { FoodType } from "../../types/component/FoodItemType";

import {
  AddFoodItemType,
  CreateFoodItemComponentType,
  CreateFoodListComponentType,
  DeleteFoodItemType,
  OpenDetailModalType,
  ReadFoodListType,
  ShowConvertedItemType,
  ShowFoodItemType,
  UpdateFoodListType,
} from "../../types/domain/FoodItemHandlerType";
import {
  deleteStorageFoodList,
  readStorageFoodList,
  updateStorageFoodList,
} from "./FoodStorageHandler";
import { handleTabButton } from "./TabButtonHandler";

// CRUD - create : mock Data
export function getFilteredFoodList({ favoriteFilter }: ReadFoodListType) {
  const previousFoodList = readStorageFoodList().filter((item: FoodType) => {
    if (favoriteFilter) return item.favorite === true;
    return item;
  });
  if (previousFoodList.length === 0 && !favoriteFilter) {
    setMockData();
  }
  return previousFoodList;
}

function setMockData() {
  localStorage.setItem("foodList", JSON.stringify(foodItems));
}

// CRUD - update(add)
export function addFoodItem({ foodItem }: AddFoodItemType) {
  if (!foodItem) return;
  updateStorageFoodList({ foodItem });
}

// CRUD - update
export function updateFoodList({ foodItem }: UpdateFoodListType) {
  updateStorageFoodList({ foodItem });
}

// CRUD - delete
export function deleteFoodItem({ filter, newFoodItem }: DeleteFoodItemType) {
  deleteStorageFoodList({ newFoodItem });
  Modal.close({ filter });
}

// < FoodItem-Data 관련 부가적인 기능 >
// 화면에 보여주기
export function createFoodListComponent({
  filter,
  foodList,
}: CreateFoodListComponentType) {
  const FoodItemListComponent = foodList.map((localFoodItem) => {
    return createFoodItemComponent({ localFoodItem, filter });
  });
  showFoodItem({ foodListComponent: FoodItemListComponent || [] });
}

function createFoodItemComponent({
  localFoodItem,
  filter,
}: CreateFoodItemComponentType) {
  return FoodItem({
    foodItem: localFoodItem,
    handleModal: (foodItem) => openDetailModal({ filter, foodItem }),
    handleTabButton: (event, foodItem) =>
      handleTabButton({ event, foodItem, filter }),
  });
}
function openDetailModal({ filter, foodItem }: OpenDetailModalType) {
  Modal.setContent({
    filter,
    modalContent: FoodDetail({ filter, foodDetailItem: foodItem }),
  });
  Modal.open();
}

function showFoodItem({ foodListComponent }: ShowFoodItemType) {
  const foodListContainer = document.querySelector(".restaurant-list");
  if (foodListContainer) foodListContainer.innerHTML = "";
  [...foodListComponent].forEach((item) => {
    foodListContainer?.appendChild(item);
  });
}

// 필더링된 데이터를 읽고 화면에 보여주기
export function showConvertedItem({
  favoriteFilter,
  filter,
}: ShowConvertedItemType) {
  const previousFoodList = getFilteredFoodList({ favoriteFilter });
  createFoodListComponent({
    filter,
    foodList: filter.sortedFoodList({ foodList: previousFoodList }),
  });
}
