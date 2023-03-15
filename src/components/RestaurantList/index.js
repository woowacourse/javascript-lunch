import "./index.css";
import RestaurantListManager from "../../domain/RestaurantListManager";
import { $ } from "../../util/dom";
import LocalStorage from "../../util/LocalStorage";
import RestaurantItem from "./RestaurantItem";

class RestaurantList {
  $target;
  restaurantListManager;

  constructor($target) {
    this.$target = $target;

    const localData = LocalStorage.getData("list");
    this.restaurantListManager = new RestaurantListManager(localData);

    this.render();
    this.renderAllList();
  }

  template() {
    return `
      <ul class="restaurant-list">
      </ul>
    `;
  }

  render() {
    this.$target.innerHTML = this.template();
  }

  renderList(restaurants) {
    const $restaurantList = this.$target.querySelector(".restaurant-list");

    $restaurantList.innerHTML = "";
    restaurants.forEach((restaurantInfo) => {
      const item = new RestaurantItem($restaurantList, restaurantInfo, this);
      item.setEvent(this);
    });
  }

  renderAllList() {
    const allList = this.restaurantListManager.getRestaurantList();

    this.renderList(allList);
  }

  renderFilteredList(category, sortingWay) {
    const filteredList = this.restaurantListManager.getRestaurantList(category, sortingWay);

    this.renderList(filteredList);
  }

  renderFavoriteList() {
    const favoriteList = this.restaurantListManager.getFavoriteList();

    this.renderList(favoriteList);
  }

  renderListAfterDataChange() {
    const selectedTab = $('input[name="tab"]:checked').value;

    if (selectedTab === "favorite") {
      this.renderFavoriteList();
      return;
    }

    if (selectedTab === "all") {
      const selectedCategory = $("#category-filter").value;
      const selectedSortingWay = $("#sorting-filter").value;

      this.renderFilteredList(selectedCategory, selectedSortingWay);
    }
  }

  changeFavoriteState(restaurantId) {
    this.restaurantListManager.toggleFavoriteState(Number(restaurantId));
    LocalStorage.setData("list", this.restaurantListManager.getRestaurantList());

    this.renderListAfterDataChange();
  }

  addRestaurant(newRestaurant) {
    this.restaurantListManager.addRestaurant({ ...newRestaurant, id: Date.now(), favorite: false });
    LocalStorage.setData("list", this.restaurantListManager.getRestaurantList());

    this.renderListAfterDataChange();
  }

  removeRestaurant(restaurantId) {
    this.restaurantListManager.removeRestaurant(restaurantId);
    LocalStorage.setData("list", this.restaurantListManager.getRestaurantList());

    this.renderListAfterDataChange();
  }
}

export default RestaurantList;
