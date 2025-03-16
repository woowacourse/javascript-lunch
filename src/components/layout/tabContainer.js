import { STORAGE_KEY_NAME } from "../../constants/storage";
import { storageHandler } from "../../utils/storageHandler";
import $restaurantItem from "../restaurant/restaurantItem";

const activeTabEvent = (id) => {
  const currentActiveTab = document.querySelector(".select-tab-active");
  currentActiveTab.classList.remove("select-tab-active");
  const currentClickTab = document.getElementById(id);
  currentClickTab.classList.add("select-tab-active");
};

const toggleTabClick = (e) => {
  activeTabEvent(e.target.id);
  const restaurantList = document.querySelector(".restaurant-list");
  restaurantList.replaceChildren();

  const categoryFilter = document.getElementById("category-filter").value;
  const sortFilter = document.getElementById("sorting-filter").value;
  let restaurantItems;
  if (e.target.id === "favorite") {
    restaurantItems = storageHandler.findFavoriteItem(
      STORAGE_KEY_NAME,
      categoryFilter,
      sortFilter
    );
  } else {
    restaurantItems = storageHandler.filterItem(
      STORAGE_KEY_NAME,
      categoryFilter,
      sortFilter
    );
  }
  if (restaurantItems.length > 0) {
    return restaurantItems.forEach((item) => {
      restaurantList.appendChild($restaurantItem(item));
    });
  }
  const noRestaurantBox = document.createElement("div");
  const noRestaurant = document.createElement("p");
  noRestaurant.id = "noRestaurant";
  noRestaurant.textContent = "등록된 음식점이 없습니다.";
  restaurantList.appendChild(noRestaurant);
};

const $tabContainer = (tabs) => {
  const container = document.createElement("nav");
  container.classList.add("tab-container");
  container.addEventListener("click", toggleTabClick);

  tabs.forEach((tab) => {
    container.appendChild(tab);
  });

  return container;
};

export default $tabContainer;
