import RestaurantFilter from "../domain/RestaurantFilter";
import RestaurantRepository from "../domain/RestaurantRepository";
import store from "../util/store";
import Restaurant from "./Restaurant";

export default class RestaurantList {
  constructor($target, props) {
    this.$target = $target;
    this.props = props;
    this.render();
    this.setEvent();
  }

  template() {
    return `
      <ul class="restaurant-list">
      </ul>
    `;
  }

  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }

  mounted() {
    const { category, sortingWay } = this.props;

    const localList = store.getLocalStorage();
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

  addEvent(eventType, selector, callback) {
    this.$target.addEventListener(eventType, (event) => {
      const target = event.target;
      if (!target.closest(selector)) return false;
      callback(event);
    });
  }
}
