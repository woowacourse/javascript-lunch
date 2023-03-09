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

  setFavoriteList(input: RestaurantForm) {
    this.favoriteItemList = [...this.favoriteItemList, input];
  }

  setFilteredList(inputList: RestaurantForm[]) {
    this.filteredItemList = [];
    this.filteredItemList = [...inputList];
  }

  getFilteredList(selectedValue: string) {
    return this.restaurantItemList.filter(
      (restaurant) => restaurant.category === selectedValue
    );
  }

  getRestaurantList() {
    return this.restaurantItemList;
  }

  getFavoriteList() {
    return this.favoriteItemList;
  }

  deleteFavoriteItem(item: RestaurantForm) {
    this.favoriteItemList = this.favoriteItemList.filter(
      (favorite) => favorite.id !== item.id
    );
  }

  deleteRestaurantItem(item: RestaurantForm) {}
}

export default Store;
