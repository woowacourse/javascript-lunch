import { RestaurantForm } from "./global/types";
import { CATEGORY_NAME } from "./constants";

class Store {
  private static restaurantItemList: RestaurantForm[] = [];
  private static favoriteItemList: RestaurantForm[] = [];
  private static filteredItemList: RestaurantForm[] = [];

  static appendRestaurantList(inputList: RestaurantForm[]) {
    this.restaurantItemList = [...this.restaurantItemList, ...inputList];
  }

  static setFilteredList(selectedValue: string) {
    selectedValue === CATEGORY_NAME.total
      ? (this.filteredItemList = this.restaurantItemList)
      : (this.filteredItemList = this.restaurantItemList.filter(
          (restaurant) => restaurant.category === selectedValue
        ));
  }

  static getFavoriteList() {
    return this.restaurantItemList.filter(({ favorite }) => favorite);
  }

  static getFilteredList() {
    return this.filteredItemList;
  }

  static getRestaurantList() {
    return this.restaurantItemList;
  }

  static deleteFavoriteItem(item: RestaurantForm) {
    this.favoriteItemList = this.favoriteItemList.filter(
      (favorite) => favorite.id !== item.id
    );
  }

  static deleteRestaurantItem(item: RestaurantForm) {
    this.restaurantItemList = this.restaurantItemList.filter(
      (restaurant) => restaurant.id !== item.id
    );
    this.filteredItemList = this.filteredItemList.filter(
      (restaurant) => restaurant.id !== item.id
    );
    this.favoriteItemList = this.favoriteItemList.filter(
      (restaurant) => restaurant.id !== item.id
    );
  }
}

export default Store;
