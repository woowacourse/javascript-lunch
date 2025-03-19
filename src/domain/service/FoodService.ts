import { FoodItem } from "../../component/FoodItem";
import { Modal } from "../../component/layout/Modal";
import { FoodType } from "../../types/component/FoodItemType";

import {
  AddFoodItemType,
  CreateFoodItemComponentType,
  CreateFoodListComponentType,
  DeleteFoodItemType,
  FavoriteFilteredFoodListType,
  OpenDetailModalType,
  ShowConvertedItemType,
  ShowFoodItemType,
  UpdateFoodListType,
} from "../../types/domain/FoodServiceType";
import {
  deleteStorageFoodList,
  readStorageFoodList,
  updateStorageFoodList,
} from "./FoodStorage";
import { mockFoodList } from "../../mocks/mockFoodList";
import { loadFoodDetail } from "../page/loadFoodDetail";
import { SortingFilter } from "../SortingFilter";
import { favoriteFilter } from "../FavoriteFilter";

// CRUD - create : mock Data
export function favoriteFilteredFoodList({
  isFavoriteFilterActive,
}: FavoriteFilteredFoodListType) {
  const storageFoodList = readStorageFoodList().filter((item: FoodType) => {
    if (isFavoriteFilterActive) return item.favorite === true;
    return item;
  });
  if (storageFoodList.length === 0 && !isFavoriteFilterActive) {
    setMockData();
  }
  return storageFoodList;
}

function setMockData() {
  localStorage.setItem("foodList", JSON.stringify(mockFoodList));
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
      favoriteFilter.toggleStatus({ event, foodItem }),
  });
}
function openDetailModal({ foodItem }: OpenDetailModalType) {
  Modal.setContent({
    modalContent: loadFoodDetail({ foodDetailItem: foodItem }),
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
export function renderFilteredFoodList({
  isFavoriteFilterActive,
}: ShowConvertedItemType) {
  const favoriteFilteredFoodlist = favoriteFilteredFoodList({
    isFavoriteFilterActive,
  });
  const filter = new SortingFilter();
  filter.saveCurrentFilter();
  createFoodListComponent({
    foodList: filter.filterAndSortFoodList({
      foodList: favoriteFilteredFoodlist,
    }),
  });
}
