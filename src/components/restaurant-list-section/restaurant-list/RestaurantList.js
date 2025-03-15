import {
  CATEGORY,
  NAV_BAR_KEYS,
  SORT_OPTIONS,
} from "../../../constants/constants.js";
import RestaurantListItem from "../restaurant-list-item/RestaurantListItem.js";
import "./restaurantList.css";

export default class RestaurantList {
  constructor(
    restaurantList,
    { getRestaurants, onToggleFavorite, onOpenDetail }
  ) {
    this.restaurantList = restaurantList;
    this.getRestaurants = getRestaurants;
    this.onToggleFavorite = onToggleFavorite;
    this.onOpenDetail = onOpenDetail;

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
        this.onToggleFavorite,
        this.onOpenDetail
      );
      this.$list.append($listItem.render());
    });

    return this.$listSection;
  }

  updateRestaurantList(
    options = {
      tabType: NAV_BAR_KEYS.all,
      filterType: {
        categoryFilterType: CATEGORY[0],
        sortFilterType: Object.keys(SORT_OPTIONS)[0],
      },
    }
  ) {
    this.restaurantList = this.getRestaurants(options);
    this.render();
  }
}
