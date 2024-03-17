import RestaurantStorage from "../../storages/RestaurantStorage";
import type { CustomStorage } from "../../storages/type";

import type { SortCategory } from "../../components/SortDropdown/SortDropdown.type";
import type { MenuCategory, RestaurantDetail } from "./Restaurant.type";

import { MENU_CATEGORIES } from "../../constants/menuCategory/menuCategory";
import { SORT_CATEGORIES_TYPE } from "../../constants/sortCategory/sortCategory";
import { ERROR_MESSAGE } from "../../constants/errorMessage";

import { STORAGE_KEYS } from "../../storages/constant";
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
    this.restaurantsDetails = this.getSortedAndFilteredRestaurant(
      this.currentCategory,
      this.sortType
    );
  }

  private getSortedAndFilteredRestaurant(
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

  public getRestaurantDetailByName(
    restaurantName: string
  ): RestaurantDetail | undefined {
    return this.restaurantsDetails.find(
      (detail) => detail.name === restaurantName
    );
  }

  public updateRestaurantsSortType(sortType: SortCategory) {
    this.restaurantsDetails = this.getSortedAndFilteredRestaurant(
      this.currentCategory,
      sortType
    );
  }

  public addRestaurant(restaurantDetail: RestaurantDetail) {
    this.storage.set(restaurantDetail);

    this.updateRestaurantsSortType(this.sortType);
  }

  public deleteRestaurantByName(restaurantName: string) {
    const restaurantIndex = this.restaurantsDetails.findIndex(
      (restaurantDetail) => restaurantDetail.name === restaurantName
    );

    if (restaurantIndex !== -1) {
      this.restaurantsDetails.splice(restaurantIndex, 1);
      this.updateRestaurant();
    }
  }

  public sortRestaurants(sortType: SortCategory) {
    this.sortType = sortType;

    this.updateRestaurantsSortType(sortType);
  }

  public filterRestaurants(
    filterType: MenuCategory,
    sortType: SortCategory = SORT_CATEGORIES_TYPE.name
  ) {
    this.currentCategory = filterType;

    this.updateRestaurantsSortType(sortType);
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

  public toggleFavoriteStatus(restaurantName: string) {
    const restaurantIndex = this.restaurantsDetails.findIndex(
      (restaurantDetail) => restaurantDetail.name === restaurantName
    );

    if (restaurantIndex !== -1) {
      this.restaurantsDetails[restaurantIndex].favorite =
        !this.restaurantsDetails[restaurantIndex].favorite;
      this.updateRestaurant();
    }
  }

  public updateRestaurant() {
    const detailsString = JSON.stringify(this.restaurantsDetails);

    localStorage.setItem(STORAGE_KEYS.restaurantDetail, detailsString);
  }
}

export default Restaurant;
