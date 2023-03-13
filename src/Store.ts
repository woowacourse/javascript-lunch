import { RestaurantForm } from "./global/types";
import { CATEGORY_NAME } from "./constants";

class Store {
  private restaurantItemList: RestaurantForm[] = [];
  private favoriteItemList: RestaurantForm[] = [];
  private filteredItemList: RestaurantForm[] = [];

  appendRestaurantList(inputList: RestaurantForm[]) {
    this.restaurantItemList = [...this.restaurantItemList, ...inputList];
  }

  setFilteredList(selectedValue: string) {
    selectedValue === CATEGORY_NAME.total
      ? (this.filteredItemList = this.restaurantItemList)
      : (this.filteredItemList = this.restaurantItemList.filter(
          (restaurant) => restaurant.category === selectedValue
        ));
  }

  getFavoriteList() {
    return this.restaurantItemList.filter(({ favorite }) => favorite);
  }

  getFilteredList() {
    return this.filteredItemList;
  }

  getRestaurantList() {
    return this.restaurantItemList;
  }

  deleteFavoriteItem(item: RestaurantForm) {
    this.favoriteItemList = this.favoriteItemList.filter(
      (favorite) => favorite.id !== item.id
    );
  }

  deleteRestaurantItem(item: RestaurantForm) {
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
