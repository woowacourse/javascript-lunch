import SortDropdown from "../../components/SortDropdown/SortDropdown";
import { SortCategory } from "../../components/SortDropdown/SortDropdown.type";
import RestaurantStore from "../../stores/RestaurantStore";
import { MenuCategory, RestaurantDetail } from "./Restaurant.type";
import { MENU_CATEGORIES } from "../../constants/menuCategory/menuCategory";
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

  public filterRestaurants(filterType: MenuCategory) {
    this.updateRestaurants();

    if (filterType === MENU_CATEGORIES.all) return;

    this.restaurants = this.restaurants.filter(
      (restaurant) => restaurant.category === filterType
    );
  }
}

export default Restaurant;
