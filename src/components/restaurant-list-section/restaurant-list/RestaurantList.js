import { NAV_BAR_KEYS } from "../../../constants/constants.js";
import RestaurantListItem from "../restaurant-list-item/RestaurantListItem.js";
import "./restaurantList.css";

export default class RestaurantList {
  constructor(restaurantList, restaurantService) {
    this.restaurantList = restaurantList;
    this.restaurantService = restaurantService;
    this.$listSection = document.createElement("section");
    this.$listSection.className = "restaurant-list-container";
    this.$list = document.createElement("ul");
    this.$list.className = "restaurant-list";
    this.$listSection.append(this.$list);
  }

  render() {
    this.$list.innerHTML = "";
    this.restaurantList.forEach((restaurantInfo) => {
      const $listItem = new RestaurantListItem(
        restaurantInfo,
        (restaurantId) => {
          this.restaurantService.toggleFavorite(restaurantId);
        }
      );
      this.$list.append($listItem.render());
    });

    return this.$listSection;
  }

  updateRestaurantList(options = { filterType: NAV_BAR_KEYS.all }) {
    this.restaurantList = this.restaurantService.getRestaurants(options);
    this.render();
  }
}
