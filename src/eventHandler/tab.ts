import { $ } from "../utils/domHelpers";
import updateRestaurantList from "../views/mainPage/components/display/restaurantList";

const tabHandler = (selectedTab: HTMLElement) => {
  const $allTab = $(".all-restaurant-tab");
  const $favoriteTab = $(".favorite-restaurant-tab");

  [$allTab, $favoriteTab].forEach((tab) => {
    if (tab === selectedTab) {
      tab.classList.add("select-tab-button");
    } else {
      tab.classList.remove("select-tab-button");
    }
  });

  const isFavoriteTab = selectedTab === $favoriteTab;
  updateRestaurantList(isFavoriteTab);
};

export default tabHandler;
