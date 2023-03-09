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

  template(restaurantList) {
    return `
      <ul class="restaurant-list">
        ${restaurantList.map((restaurantInfo) => new RestaurantItem(restaurantInfo).template()).join("")}
      </ul>
    `;
  }

  render(restaurantList) {
    this.$target.innerHTML = this.template(restaurantList);
  }

  renderFilteredList(category, sortingWay) {
    const filteredList = this.restaurantListManager.getRestaurantList(category, sortingWay);

    this.render(filteredList);
  }

  addRestaurant(newRestaurant) {
    this.restaurantListManager.addRestaurant({ id: Date.now(), ...newRestaurant });
    LocalStorage.setData("list", this.restaurantListManager.getRestaurantList());

    const selectedCategory = $("#category-filter").value;
    const selectedSortingWay = $("#sorting-filter").value;

    this.renderFilteredList(selectedCategory, selectedSortingWay);
  }
}

export default RestaurantList;
