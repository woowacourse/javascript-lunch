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
      document
        .querySelector(".restaurant-filter-container")
        ?.classList.toggle("filter-toggle");
      this.renderAllRestaurants();
      allTab.classList.toggle("selected");
      favoriteTab.classList.toggle("selected");
    });
    favoriteTab.addEventListener("click", () => {
      document
        .querySelector(".restaurant-filter-container")
        ?.classList.toggle("filter-toggle");
      this.renderFavoriteRestaurants();
      allTab.classList.toggle("selected");
      favoriteTab.classList.toggle("selected");
    });
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
