import Header from "./Header/Header.js";
import { createRestaurant, updateRestaurant } from "./createRestaurant.js";
import Component from "./Component.js";
import { filterRestaurants } from "../domain/filterRestaurants.js";
import { sortRestaurants } from "../domain/sortRestaurants.js";
class App extends Component {
  constructor($target) {
    super($target);
    document.addEventListener("restaurantUpdated", (event) =>
      updateRestaurant(event.detail),
    );
  }

  render() {
    new Header(document.querySelector(".gnb"));
    createRestaurant();
    this.setEvent();
  }

  setEvent() {
    const categoryFilter = document.getElementById("category-filter");
    categoryFilter.addEventListener("change", (event) => {
      const selectedCategory = event.target.value;
      filterRestaurants(selectedCategory);
    });

    const sortingFilter = document.getElementById("sorting-filter");
    sortingFilter.addEventListener("change", (event) => {
      const selectedSort = event.target.value;
      sortRestaurants(selectedSort);
    });
  }
}
export default App;
