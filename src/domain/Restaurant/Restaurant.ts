import RestaurantStorage from "../../storages/RestaurantStorage";
import type { CustomStorage } from "../../storages/type";

import type { MenuCategory, RestaurantDetail } from "./Restaurant.type";

import { MENU_CATEGORIES } from "../../constants/menuCategory/menuCategory";
import { SORT_CATEGORIES_TYPE } from "../../constants/sortCategory/sortCategory";
import { ERROR_MESSAGE } from "../../constants/errorMessage";
import type { SortCategory } from "../../constants/sortCategory/sortCategory.type";

class Restaurant {
  private currentCategory: MenuCategory = MENU_CATEGORIES.all;

  private sortType: SortCategory = SORT_CATEGORIES_TYPE.name;

  private storage: CustomStorage<RestaurantDetail[], RestaurantDetail>;

  private restaurantsDetails: RestaurantDetail[];

  constructor(
    storage: CustomStorage<
      RestaurantDetail[],
      RestaurantDetail
    > = RestaurantStorage
  ) {
    this.storage = storage;
    this.restaurantsDetails = this.getSortedRestaurants(
      this.currentCategory,
      this.sortType
    );
  }

  private getSortedRestaurants(
    category: MenuCategory,
    sortType: SortCategory
  ): RestaurantDetail[] {
    return this.storage
      .get()
      .filter(
        (restaurantDetail: RestaurantDetail) =>
          category === MENU_CATEGORIES.all ||
          restaurantDetail.category === category
      )
      .sort(
        sortType === SORT_CATEGORIES_TYPE.name
          ? (a: RestaurantDetail, b: RestaurantDetail) =>
              a.name.localeCompare(b.name)
          : (a: RestaurantDetail, b: RestaurantDetail) =>
              a.distance - b.distance
      );
  }

  public getRestaurantDetails() {
    return this.restaurantsDetails;
  }

  public updateRestaurants(sortType: SortCategory) {
    this.restaurantsDetails = this.getSortedRestaurants(
      this.currentCategory,
      sortType
    );
  }

  public addRestaurant(restaurantDetail: RestaurantDetail) {
    this.storage.set(restaurantDetail);

    this.updateRestaurants(this.sortType);
  }

  public sortRestaurants(sortType: SortCategory) {
    this.sortType = sortType;

    this.updateRestaurants(sortType);
  }

  public filterRestaurants(
    filterType: MenuCategory,
    sortType: SortCategory = SORT_CATEGORIES_TYPE.name
  ) {
    this.currentCategory = filterType;

    this.updateRestaurants(sortType);
  }

  public findDuplicateRestaurantByName(
    userInputRestaurantDetail: RestaurantDetail
  ) {
    const duplicateRestaurantDetail = this.restaurantsDetails.find(
      (restaurantDetail) =>
        restaurantDetail.name === userInputRestaurantDetail.name
    );

    if (duplicateRestaurantDetail) {
      throw new Error(ERROR_MESSAGE.duplicateRestaurant);
    }
  }
}

export default Restaurant;
