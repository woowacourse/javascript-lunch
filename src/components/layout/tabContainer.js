import $createRestaurantList from "../restaurant/restaurantItemList";
import { STORAGE_KEY_NAME } from "../../constants/storage";
import { storageHandler } from "../../utils/storageHandler";

const activeTabEvent = (id) => {
  const currentActiveTab = document.querySelector(".select-tab-active");
  currentActiveTab.classList.remove("select-tab-active");
  const currentClickTab = document.getElementById(id);
  currentClickTab.classList.add("select-tab-active");
};

const toggleTabClick = (e) => {
  activeTabEvent(e.target.id);
  $createRestaurantList();
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
