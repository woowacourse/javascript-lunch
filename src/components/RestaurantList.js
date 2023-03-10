import { TAB } from "../constant/variables";
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

  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }

  mounted() {
    const { category, sortingWay } = this.props;

    const localList = store.getLocalStorage();
    const sortedRestaurants = RestaurantFilter.sortRestaurants(sortingWay, localList);
    this.#restaurantList = RestaurantFilter.categorizeRestaurants(category, sortedRestaurants);
    const $restaurantList = this.$target.querySelector(".restaurant-list");

    const { tab } = this.props;
    if (tab === TAB.ALL) {
      this.#restaurantList.forEach((restaurant, index) => {
        new Restaurant($restaurantList, { ...restaurant, render: this.render.bind(this), index });
      });
    }
    if (tab === TAB.FAVORITE) {
      const favoriteRestaurants = [...localList].filter(({ stared }) => stared);
      favoriteRestaurants.forEach((restaurant, index) => {
        new Restaurant($restaurantList, { ...restaurant, render: this.render.bind(this), index });
      });
    }
  }

  setState(newState) {
    this.#restaurantList = store.getLocalStorage();
    this.render();
  }
}
