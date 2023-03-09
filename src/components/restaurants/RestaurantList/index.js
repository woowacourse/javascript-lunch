import "./index.css";
import RestaurantListManager from "../../../domain/RestaurantListManager";
import { $ } from "../../../util/dom";
import LocalStorage from "../../../util/LocalStorage";
import RestaurantItem from "../RestaurantItem";

class RestaurantList {
  $target;
  restaurantListManager;

  constructor($target) {
    this.$target = $target;

    const localData = LocalStorage.getData("list");
    this.restaurantListManager = new RestaurantListManager(localData);
    this.render(this.restaurantListManager.getRestaurantList());
  }

  template() {
    return `
      <ul class="restaurant-list">
      </ul>
    `;
  }

  render(restaurantList) {
    this.$target.innerHTML = this.template();
    const $restaurantList = this.$target.querySelector(".restaurant-list");

    restaurantList.forEach((restaurantInfo) => {
      new RestaurantItem($restaurantList, restaurantInfo);
    });
  }

  renderFilteredList(category, sortingWay) {
    const filteredList = this.restaurantListManager.getRestaurantList(category, sortingWay);

    this.render(filteredList);
  }

  addRestaurant(newRestaurant) {
    this.restaurantListManager.addRestaurant(newRestaurant);
    LocalStorage.setData("list", this.restaurantListManager.getRestaurantList());

    const selectedCategory = $("#category-filter").value;
    const selectedSortingWay = $("#sorting-filter").value;

    this.renderFilteredList(selectedCategory, selectedSortingWay);
  }
}

export default RestaurantList;
