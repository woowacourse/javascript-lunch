import SortDropdown from "../../components/SortDropdown/SortDropdown";
import { SortCategory } from "../../components/SortDropdown/SortDropdown.type";
import RestaurantStorage from "../../storages/RestaurantStorage";
import { MenuCategory, RestaurantDetail } from "./Restaurant.type";
import { MENU_CATEGORIES } from "../../constants/menuCategory/menuCategory";

class Restaurant {
  private currentCategory = MENU_CATEGORIES.all;

  private sortType: SortCategory = SortDropdown.SORT_CATEGORIES_TYPE.name;

  private restaurants: RestaurantDetail[] = this.getSortedRestaurants(
    MENU_CATEGORIES.all,
    SortDropdown.SORT_CATEGORIES_TYPE.name
  );

  private getSortedRestaurants(
    category: MenuCategory,
    sortType: SortCategory
  ): RestaurantDetail[] {
    return RestaurantStorage.get()
      .filter(
        (restaurantDetail: RestaurantDetail) =>
          category === MENU_CATEGORIES.all ||
          restaurantDetail.category === category
      )
      .sort(
        sortType === SortDropdown.SORT_CATEGORIES_TYPE.name
          ? (a: RestaurantDetail, b: RestaurantDetail) =>
              a.name.localeCompare(b.name)
          : (a: RestaurantDetail, b: RestaurantDetail) =>
              a.distance - b.distance
      );
  }

  public getRestaurants() {
    return this.restaurants;
  }

  public updateRestaurants(sortType: SortCategory) {
    this.restaurants = this.getSortedRestaurants(
      this.currentCategory,
      sortType
    );
  }

  public addRestaurant(restaurantDetail: RestaurantDetail) {
    RestaurantStorage.set(restaurantDetail);

    this.updateRestaurants(this.sortType);
  }

  public sortRestaurants(sortType: SortCategory) {
    this.sortType = sortType;

    this.updateRestaurants(sortType);
  }

  public filterRestaurants(filterType: MenuCategory, sortType: SortCategory) {
    this.currentCategory = filterType;

    this.updateRestaurants(sortType);
  }
}

export default Restaurant;
