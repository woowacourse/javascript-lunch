import Header from "./Header/Header.js";
import { createRestaurant, updateRestaurant } from "./createRestaurant.js";
import Component from "./Component.js";
import { filterRestaurants } from "../domain/filterRestaurants.ts";
import { getStoredRestaurantData } from "../domain/storeRestaurantData.ts";
import Tab from "./Tab/Tab.ts";
import { STORAGE_KEY } from "../data/constants.ts";
class App extends Component {
  constructor($target) {
    super($target);
    document.addEventListener("restaurantUpdated", (event) =>
      updateRestaurant(event.detail),
    );
  }

  render() {
    new Header(document.querySelector(".gnb"));
    new Tab(document.querySelector(".tab-container"));
    filterRestaurants(
      localStorage.getItem(STORAGE_KEY.CATEGORY),
      localStorage.getItem(STORAGE_KEY.SORT_TYPE),
    );
    this.setEvent();
  }

  setEvent() {
    const filtersContainer = document.querySelector(
      ".restaurant-filter-container",
    );
    filtersContainer.addEventListener("change", (event) => {
      const target = event.target;
      if (target.id === "category-filter") {
        const currentSortType = localStorage.getItem(STORAGE_KEY.SORT_TYPE);
        filterRestaurants(target.value, currentSortType);
      } else if (target.id === "sorting-filter") {
        const currentCategory = localStorage.getItem(STORAGE_KEY.CATEGORY);
        filterRestaurants(currentCategory, target.value);
      }
    });
  }
}
export default App;
