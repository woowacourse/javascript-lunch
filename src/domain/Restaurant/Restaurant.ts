import SortDropdown from "../../components/SortDropdown/SortDropdown";
import { SortCategory } from "../../components/SortDropdown/SortDropdown.type";
import RestaurantStore from "../../stores/RestaurantStore";
import { RestaurantDetail } from "./Restaurant.type";

class Restaurant {
  private restaurants: RestaurantDetail[] = RestaurantStore.get();

  public getRestaurants() {
    return this.restaurants;
  }

  public updateRestaurants() {
    this.restaurants = RestaurantStore.get();
  }

  public addRestaurant(restaurantDetail: RestaurantDetail) {
    RestaurantStore.set(restaurantDetail);
  }

  public sortRestaurants(sortType: SortCategory) {
    if (sortType === SortDropdown.SORT_CATEGORIES_TYPE.distance) {
      this.restaurants = this.restaurants.sort(
        (a, b) => a["distance"] - b["distance"]
      );
    }

    if (sortType === SortDropdown.SORT_CATEGORIES_TYPE.name) {
      this.restaurants = this.restaurants.sort((a, b) =>
        a["name"].localeCompare(b["name"])
      );
    }
  }
}

export default Restaurant;
