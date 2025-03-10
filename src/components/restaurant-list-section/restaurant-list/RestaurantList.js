import RestaurantListItem from "../restaurant-list-item/RestaurantListItem.js";
import "./restaurantList.css";

export default class RestaurantList {
  constructor(restaurantList) {
    this.restaurantList = restaurantList;
    this.$listSection = document.createElement("section");
    this.$listSection.className = "restaurant-list-container";
    this.$list = document.createElement("ul");
    this.$list.className = "restaurant-list";
    this.$listSection.append(this.$list);
  }

  render() {
    this.$list.innerHTML = "";
    this.restaurantList.forEach((restaurantInfo) =>
      this.$list.append(new RestaurantListItem(restaurantInfo).render())
    );
    return this.$listSection;
  }

  update(restaurantList) {
    this.restaurantList = restaurantList;
    this.render();
  }
}
