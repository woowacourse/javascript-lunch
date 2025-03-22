import { STORAGE_KEY } from "../../data/constants.ts";
import { filterRestaurants } from "../../domain/filterRestaurants.ts";
import { getStoredRestaurantData } from "../../domain/storeRestaurantData.ts";
import Component from "../Component.js";
import { createRestaurant } from "../createRestaurant.js";

class Tab extends Component {
  constructor($target: HTMLElement) {
    super($target);
  }
  template() {
    return /*html*/ `
    <div class="all">모든 음식점</div>
    <div class="favorite">자주 가는 음식점</div>
        `;
  }

  setEvent() {
    const allTab = this.$target.querySelector(".all");
    allTab.classList.add("selected");
    const favoriteTab = this.$target.querySelector(".favorite");
    allTab.addEventListener("click", () => {
      this.filterToggle();
      this.setCurrentTab("all");
      this.renderAllRestaurants();
      allTab.classList.add("selected");
      favoriteTab.classList.remove("selected");
    });
    favoriteTab.addEventListener("click", () => {
      this.filterToggle();
      this.setCurrentTab("favorite");
      this.renderFavoriteRestaurants();
      allTab.classList.remove("selected");
      favoriteTab.classList.add("selected");
    });
  }

  setCurrentTab = (tab: string) => {
    localStorage.setItem("currentTab", tab);
  };

  filterToggle() {
    if (
      document
        .querySelector(".restaurant-filter-container")
        ?.classList.contains("filter-toggle")
    ) {
      document
        .querySelector(".restaurant-filter-container")
        ?.classList.remove("filter-toggle");
    } else {
      document
        .querySelector(".restaurant-filter-container")
        ?.classList.add("filter-toggle");
    }
  }

  renderAllRestaurants() {
    filterRestaurants(
      localStorage.getItem(STORAGE_KEY.CATEGORY)!,
      localStorage.getItem(STORAGE_KEY.SORT_TYPE)!,
    );
  }

  renderFavoriteRestaurants() {
    let savedRestaurants = getStoredRestaurantData();
    savedRestaurants = savedRestaurants.filter(
      (restaurant) => restaurant.like === true,
    );
    createRestaurant(savedRestaurants);
  }
}
export default Tab;
