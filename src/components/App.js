import Header from "./Header/Header.js";
import { createRestaurant, updateRestaurant } from "./createRestaurant.js";
import Component from "./Component.js";
import { filterRestaurants } from "../domain/filterRestaurants.js";
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
      console.log(selectedCategory);
      filterRestaurants(selectedCategory);
    });
  }
}
export default App;
