import tabHandler from "../../../../eventHandler/tab.ts";
import { $ } from "../../../../utils/domHelpers.js";

const tabContainer = () => {
  const $restaurantTabContainer = $(".restaurant-tab-container");

  $restaurantTabContainer.innerHTML = `
    <button class="tab-button select-tab-button all-restaurant-tab">모든 음식점</button>
    <button class="tab-button favorite-restaurant-tab">자주 가는 음식점</button>
    <div class="select-effect"></div>
  `;

  const $allTab = $(".all-restaurant-tab");
  const $favoriteTab = $(".favorite-restaurant-tab");

  $allTab.addEventListener("click", () => tabHandler($allTab));
  $favoriteTab.addEventListener("click", () => tabHandler($favoriteTab));
};

export default tabContainer;
