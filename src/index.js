import "../templates/style.css";
import "./image/add-button.png";

import AllRestaurantList, {
  ALL_RESTAURANTS_LOCAL_STORAGE_KEY,
  postRestaurant,
} from "./domain/AllRestaurantList";
import {
  CATEGORY_FILTER_DEFAULT__VALUE,
  CATEGORY_FILTER_NAME,
  CATEGORY_WITH_ENTIRE,
  SORT_STANDARD,
  SORT_STANDARD_FILTER_DEFAULT_VALUE,
  SORT_STANDARD_FILTER_NAME,
} from "./constants/selectOptions";

import AddingRestaurantModal from "./view/components/Modal/AddingRestaurantModal";
import RestaurantList from "./domain/RestaurantList";
import RestaurantListTab from "./view/components/Tab/RestaurantListTab";
import generateRestaurantList from "./view/components/generateRestaurantList";
import generateSelectBox from "./view/components/ReadableElement/generateSelectBox";
import getLocalStorageItem from "./utils/getLocalStorageItem";
import { restaurantData } from "./data/restaurantData";

// 음식점 스텁 데이터로 AllRestaurantList 설정
const restaurants = getLocalStorageItem(
  ALL_RESTAURANTS_LOCAL_STORAGE_KEY,
  restaurantData
);

AllRestaurantList.init(restaurants ?? []);

// 음식점 추가 모달 추가
const openButton = document.getElementById("add-restaurant-button");
const addingModalContainer = document.getElementById(
  "adding-restaurant-modal-container"
);
const addModal = new AddingRestaurantModal();

addingModalContainer.append(addModal.element);

// 모든 음식점-자주 가는 음식점 탭 추가
const tabContainer = document.getElementById("tab-container");
const tab = new RestaurantListTab().tabElement;

tabContainer.appendChild(tab);

// 모든 음식점 탭 내부 filter 추가
const filterContainer = document.getElementById("filter-container");
const categorySelectBox = generateSelectBox({
  options: CATEGORY_WITH_ENTIRE,
  name: CATEGORY_FILTER_NAME,
});
const sortStandardSelectBox = generateSelectBox({
  options: SORT_STANDARD,
  name: SORT_STANDARD_FILTER_NAME,
});

filterContainer.append(categorySelectBox, sortStandardSelectBox);

// 모든 음식점 탭 내부 음식점 목록 추가
const restaurantAllListContainer = document.getElementById(
  "restaurant-all-list-container"
);
const restaurantList = generateRestaurantList({
  restaurantList: AllRestaurantList,
  category: CATEGORY_FILTER_DEFAULT__VALUE,
  sortStandard: SORT_STANDARD_FILTER_DEFAULT_VALUE,
});

restaurantAllListContainer.append(restaurantList);

//이벤트 리스너 등록
openButton.addEventListener("click", () => {
  addModal.toggle();
});

tab.addEventListener("click", () => {
  if (tab.getAttribute("value") === "모든 음식점") {
    renderFilteredContainer(restaurantAllListContainer, AllRestaurantList);
  }
  if (tab.getAttribute("value") === "자주 가는 음식점") {
    const restaurantFavoriteListContainer = document.getElementById(
      "restaurant-favorite-list-container"
    );

    if (restaurantFavoriteListContainer) {
      const ul = generateRestaurantList({
        restaurantList: new RestaurantList(AllRestaurantList.withFavorites()),
        category: CATEGORY_FILTER_DEFAULT__VALUE,
        sortStandard: SORT_STANDARD_FILTER_DEFAULT_VALUE,
      });

      restaurantFavoriteListContainer.replaceChildren(ul);
    }
  }
});

filterContainer.addEventListener("change", () => {
  renderFilteredContainer(restaurantAllListContainer, AllRestaurantList);
});

addingModalContainer.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = e.target["name"].value;
  const category = e.target["category"].value;
  const distance = e.target["distance"].value;
  const description = e.target["description"].value;
  const link = e.target["link"].value;
  const favorites = false;

  addModal.toggle();

  postRestaurant({
    name,
    category,
    distance,
    description,
    link,
    favorites,
  });

  renderFilteredContainer(restaurantAllListContainer, AllRestaurantList);
});

export const renderFilteredContainer = (
  restaurantListContainer,
  restaurantList
) => {
  const filteredList = generateRestaurantList({
    restaurantList: restaurantList,
    category: categorySelectBox.value,
    sortStandard: sortStandardSelectBox.value,
  });

  restaurantListContainer.replaceChildren(filteredList);
};
