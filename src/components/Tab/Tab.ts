import { filterRestaurants } from "../../domain/filterRestaurants";
import { getStoredRestaurantData } from "../../domain/storeRestaurantData";
import Component from "../Component";
import { createRestaurant } from "../createRestaurant";

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
      this.renderAllRestaurants();
      allTab.classList.add("selected");
      favoriteTab.classList.remove("selected");
    });
    favoriteTab.addEventListener("click", () => {
      this.filterToggle();
      this.renderFavoriteRestaurants();
      allTab.classList.remove("selected");
      favoriteTab.classList.add("selected");
    });
  }

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
      localStorage.getItem("selectedCategory")!,
      localStorage.getItem("sortType")!,
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
