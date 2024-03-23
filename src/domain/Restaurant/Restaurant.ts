import RestaurantStorage from "../../storages/RestaurantStorage";
import { CustomStorage } from "../../storages/type";
import { MENU_CATEGORIES } from "../../constants/menuCategory/menuCategory";
import { SORT_CATEGORIES_TYPE } from "../../constants/sortCategory/sortCategory";
import { ERROR_MESSAGE } from "../../constants/errorMessage";
import { STORAGE_KEYS } from "../../storages/constant";

import type { SortCategory } from "../../components/SortDropdown/SortDropdown.type";
import type { MenuCategory, RestaurantDetail } from "./Restaurant.type";

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
    this.restaurantsDetails = this.getSortedAndFilteredRestaurant();
  }

  private getSortedAndFilteredRestaurant(): RestaurantDetail[] {
    return this.storage
      .get()
      .filter(
        (restaurantDetail) =>
          this.currentCategory === MENU_CATEGORIES.all ||
          restaurantDetail.category === this.currentCategory
      )
      .sort((a, b) =>
        this.sortType === SORT_CATEGORIES_TYPE.name
          ? a.name.localeCompare(b.name)
          : a.distance - b.distance
      );
  }

  private findRestaurantIndexByName(restaurantName: string): number {
    return this.restaurantsDetails.findIndex(
      (restaurantDetail) => restaurantDetail.name === restaurantName
    );
  }

  public getRestaurantDetails(): RestaurantDetail[] {
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
    this.sortType = sortType;
    this.restaurantsDetails = this.getSortedAndFilteredRestaurant();
  }

  public addRestaurant(restaurantDetail: RestaurantDetail) {
    this.findDuplicateRestaurantByName(restaurantDetail);

    this.storage.set(restaurantDetail);
    this.updateRestaurantsSortType(this.sortType);
  }

  public deleteRestaurantByName(restaurantName: string) {
    const restaurantIndex = this.findRestaurantIndexByName(restaurantName);
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
    const restaurantIndex = this.findRestaurantIndexByName(restaurantName);
    if (restaurantIndex !== -1) {
      this.restaurantsDetails[restaurantIndex].favorite =
        !this.restaurantsDetails[restaurantIndex].favorite;
      this.updateRestaurant();
    }
  }

  private updateRestaurant() {
    localStorage.setItem(
      STORAGE_KEYS.restaurantDetail,
      JSON.stringify(this.restaurantsDetails)
    );
  }

  public updateRestaurantsDetails() {
    const detailsToUpdate = localStorage.getItem(STORAGE_KEYS.restaurantDetail);
    this.restaurantsDetails = detailsToUpdate
      ? JSON.parse(detailsToUpdate)
      : [];

    this.restaurantsDetails = this.getSortedAndFilteredRestaurant();
  }
}

export default Restaurant;
