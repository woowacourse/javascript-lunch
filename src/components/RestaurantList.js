import Component from "../core/Component";
import RestaurantFilter from "../domain/RestaurantFilter";
import RestaurantRepository from "../domain/RestaurantRepository";
import store from "../util/store";
import Restaurant from "./Restaurant";

export default class RestaurantList extends Component {
  restaurantRepository;

  template() {
    return `
      <ul class="restaurant-list">
      </ul>
    `;
  }

  mounted() {
    const { category, sortingWay } = this.props;

    const localList = store.getLocalStorage();
    this.restaurantRepository = new RestaurantRepository(localList);
    const sortedRestaurants = RestaurantFilter.sortRestaurants(sortingWay, localList);
    const categorizedRestaurants = RestaurantFilter.categorizeRestaurants(category, sortedRestaurants);

    const $restaurantList = this.$target.querySelector(".restaurant-list");
    categorizedRestaurants.forEach((restaurant) => {
      new Restaurant($restaurantList, restaurant);
    });
  }

  setEvent() {
    this.addEvent("submit", "#add-restaurant-form", () => {
      this.render();
    });
  }
}
