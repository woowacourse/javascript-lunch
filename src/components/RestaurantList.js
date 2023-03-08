import RestaurantFilter from "../domain/RestaurantFilter";
import store from "../util/store";
import Restaurant from "./Restaurant";

export default class RestaurantList {
  #restaurantList;

  constructor($target, props) {
    this.$target = $target;
    this.props = props;
    this.render();
  }

  template() {
    return `
      <ul class="restaurant-list">
      </ul>
    `;
  }

  setup() {
    const { category, sortingWay } = this.props;

    const localList = store.getLocalStorage();
    const sortedRestaurants = RestaurantFilter.sortRestaurants(sortingWay, localList);
    this.#restaurantList = RestaurantFilter.categorizeRestaurants(category, sortedRestaurants);
  }

  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }

  mounted() {
    this.setup();
    const $restaurantList = this.$target.querySelector(".restaurant-list");
    this.#restaurantList.forEach((restaurant, index) => {
      new Restaurant($restaurantList, { ...restaurant, render: this.render.bind(this), index });
    });
  }

  setState(newState) {
    this.#restaurantList = store.getLocalStorage();
    this.render();
  }

  addEvent(eventType, selector, callback) {
    this.$target.addEventListener(eventType, (event) => {
      const target = event.target;
      if (!target.closest(selector)) return false;
      callback(event);
    });
  }
}
