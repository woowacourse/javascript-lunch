import { RestaurantForm } from "./types/types";
import { CATEGORY_NAME } from "./constants";

class Store {
  static restaurantItemList: RestaurantForm[] = [];
  static favoriteItemList: RestaurantForm[] = [];
  static filteredItemList: RestaurantForm[] = [];

  static setRestaurantList(inputList: RestaurantForm[]) {
    this.restaurantItemList = [...this.restaurantItemList, ...inputList];
  }

  static appendRestaurant(input: RestaurantForm) {
    this.restaurantItemList = [...this.restaurantItemList, input];
  }

  static setFilteredList(selectedValue: string) {
    selectedValue === CATEGORY_NAME.total
      ? (this.filteredItemList = this.restaurantItemList)
      : (this.filteredItemList = this.restaurantItemList.filter(
          (restaurant) => restaurant.category === selectedValue
        ));
  }

  static getFavoriteList() {
    return this.restaurantItemList.filter(
      (restaurant) => restaurant.favorite === true
    );
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
  }
}

export default Store;
