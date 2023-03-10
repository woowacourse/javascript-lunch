import { RestaurantForm } from "./types";

class Store {
  private restaurantItemList: RestaurantForm[] = [];
  private favoriteItemList: RestaurantForm[] = [];
  private filteredItemList: RestaurantForm[] = [];

  setRestaurantList(inputList: RestaurantForm[]) {
    this.restaurantItemList = [...this.restaurantItemList, ...inputList];
  }

  appendRestaurant(input: RestaurantForm) {
    this.restaurantItemList = [...this.restaurantItemList, input];
  }

  getFavoriteList() {
    return this.restaurantItemList.filter(
      (restaurant) => restaurant.favorite === true
    );
  }

  getFilteredList(selectedValue: string) {
    return this.restaurantItemList.filter(
      (restaurant) => restaurant.category === selectedValue
    );
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
  }
}

export default Store;
