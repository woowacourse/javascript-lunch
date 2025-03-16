import Header from "./Header/Header.js";
import { createRestaurant, updateRestaurant } from "./createRestaurant.js";
import Component from "./Component.js";
import { filterRestaurants } from "../domain/filterRestaurants.js";
import { getStoredRestaurantData } from "../domain/storeRestaurantData.js";
import Tab from "./Tab/Tab.js";
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
      localStorage.getItem("selectedCategory"),
      localStorage.getItem("sortType"),
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
        const currentSortType = localStorage.getItem("sortType");
        filterRestaurants(target.value, currentSortType);
      } else if (target.id === "sorting-filter") {
        const currentCategory = localStorage.getItem("selectedCategory");
        filterRestaurants(currentCategory, target.value);
      }
    });
  }
}
export default App;
