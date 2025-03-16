import $restaurantItem from "../restaurant/restaurantItem.js";
import { STORAGE_KEY_NAME } from "../../constants/storage.js";
import { storageHandler } from "../../utils/storageHandler.js";
import $restaurantList from "../restaurant/restaurantItemList.js";

const activeTabEvent = (id) => {
  const currentActiveTab = document.querySelector(".select-tab-active");
  currentActiveTab.classList.remove("select-tab-active");
  const currentClickTab = document.getElementById(id);
  currentClickTab.classList.add("select-tab-active");
};

const toggleTabClick = (e) => {
  activeTabEvent(e.target.id);

  const restaurantContainer = document.querySelector(
    ".restaurant-list-container"
  );
  restaurantContainer.replaceChildren();

  const categoryFilter = document.getElementById("category-filter").value;
  const sortFilter = document.getElementById("sorting-filter").value;
  let restaurantItems;
  if (e.target.id === "all") {
    restaurantItems = storageHandler.filterItem(
      STORAGE_KEY_NAME,
      categoryFilter,
      sortFilter
    );
  }

  if (e.target.id === "favorite") {
    restaurantItems = storageHandler.findFavoriteItem(
      STORAGE_KEY_NAME,
      categoryFilter,
      sortFilter
    );
  }

  restaurantContainer.appendChild($restaurantList(restaurantItems));
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
