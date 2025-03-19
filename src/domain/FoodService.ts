import { FoodItem } from "../component/FoodItem";
import { Modal } from "../component/layout/Modal";
import { foodItems } from "../mocks/foodItems";
import { FoodDetail } from "../pages/FoodDetail";
import { FoodType } from "../types/component/FoodItemType";

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
} from "../types/domain/FoodServiceType";
import {
  deleteStorageFoodList,
  readStorageFoodList,
  updateStorageFoodList,
} from "./FoodStorage";
import { changeFavoriteStatus } from "./FavoriteService";
import { Filter } from "./Filter";

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
export function deleteFoodItem({ newFoodItem }: DeleteFoodItemType) {
  deleteStorageFoodList({ newFoodItem });
  Modal.close(); // filter
}

// < FoodItem-Data 관련 부가적인 기능 >
// 화면에 보여주기
export function createFoodListComponent({
  foodList,
}: CreateFoodListComponentType) {
  const FoodItemListComponent = foodList.map((localFoodItem) => {
    return createFoodItemComponent({ localFoodItem });
  });
  showFoodItem({ foodListComponent: FoodItemListComponent || [] });
}

function createFoodItemComponent({
  localFoodItem,
}: CreateFoodItemComponentType) {
  return FoodItem({
    foodItem: localFoodItem,
    handleModal: (foodItem) => openDetailModal({ foodItem }),
    handleTabButton: (event, foodItem) =>
      changeFavoriteStatus({ event, foodItem }),
  });
}
function openDetailModal({ foodItem }: OpenDetailModalType) {
  Modal.setContent({
    modalContent: FoodDetail({ foodDetailItem: foodItem }),
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
export function showConvertedItem({ favoriteFilter }: ShowConvertedItemType) {
  const previousFoodList = getFilteredFoodList({ favoriteFilter });
  const filter = new Filter();
  filter.saveCurrentFilter();
  createFoodListComponent({
    //filter 필요함
    foodList: filter.sortedFoodList({ foodList: previousFoodList }),
  });
}
