import "./index.css";
import RestaurantListManager from "../../../domain/RestaurantListManager";
import { $ } from "../../../util/dom";
import LocalStorage from "../../../util/LocalStorage";
import RestaurantItem from "../RestaurantItem";

class RestaurantList {
  $target;
  modal;
  restaurantListManager;

  constructor($target, modal) {
    this.$target = $target;
    this.modal = modal;

    const localData = LocalStorage.getData("list");
    this.restaurantListManager = new RestaurantListManager(localData);

    this.renderAllList();
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
      const item = new RestaurantItem($restaurantList, restaurantInfo);
      item.setFavoriteClickEvent(this.restaurantListManager);
      item.setRestaurantInfoEvent(this.removeRestaurant.bind(this), this.modal);
    });
  }

  renderAllList() {
    const allList = this.restaurantListManager.getRestaurantList();

    this.render(allList);
  }

  renderFilteredList(category, sortingWay) {
    const filteredList = this.restaurantListManager.getRestaurantList(category, sortingWay);

    this.render(filteredList);
  }

  renderFavoriteList() {
    const favoriteList = this.restaurantListManager.getFavoriteList();

    this.render(favoriteList);
  }

  addRestaurant(newRestaurant) {
    this.restaurantListManager.addRestaurant({ ...newRestaurant, id: Date.now(), favorite: false });
    LocalStorage.setData("list", this.restaurantListManager.getRestaurantList());

    const selectedCategory = $("#category-filter").value;
    const selectedSortingWay = $("#sorting-filter").value;

    this.renderFilteredList(selectedCategory, selectedSortingWay);
  }

  removeRestaurant(restaurantId) {
    this.restaurantListManager.removeRestaurant(restaurantId);
    LocalStorage.setData("list", this.restaurantListManager.getRestaurantList());

    const selectedCategory = $("#category-filter").value;
    const selectedSortingWay = $("#sorting-filter").value;

    this.renderFilteredList(selectedCategory, selectedSortingWay);
  }
}

export default RestaurantList;
