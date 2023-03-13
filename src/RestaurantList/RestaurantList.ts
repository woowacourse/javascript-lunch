import PersonalRestaurant from "../type/PersonalRestaurant";
import createElement from "./UI/createElement";
import RestaurantSummary from "../RestaurantSummary/RestaurantSummary";
import updateList from "./features/updateList";

class RestaurantList {
  public list: RestaurantSummary[] = [];
  public element: HTMLElement = createElement();

  add(personalRestaurant: PersonalRestaurant) {
    this.list.push(new RestaurantSummary(personalRestaurant));
    updateList(this);
  }

  getList() {
    return this.list.map((summary) => summary.info);
  }

  newRestaurantEventCallback(event: CustomEvent) {
    this.add({ restaurant: event.detail.restaurant, favorite: event.detail.favorite });
  }

  deleteCallback(event: CustomEvent) {
    this.list = this.list.filter((summary) => summary.info !== event.detail.info);
    updateList(this);
  }

  favoriteChangeCallback(event: CustomEvent) {
    if (event.detail.from === "detailed") {
      this.list.forEach((summary) => summary.favoriteChangeCallback(event));
    }
  }

  updateCallback(event: CustomEvent) {
    updateList(this);
  }
}

export default RestaurantList;
