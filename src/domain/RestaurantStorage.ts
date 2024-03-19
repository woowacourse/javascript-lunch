import { RestaurantType, Category, SortingStandard } from "../types";
import { RESTAURANTS } from "../constants";

class RestauranStorage {
  category: Category | "전체" = "전체";
  sortingStandard: SortingStandard = "name";
  filter = "all";

  private getResturantsFromLocalStorage(): RestaurantType[] {
    if (!localStorage.getItem(RESTAURANTS)) {
      localStorage.setItem(RESTAURANTS, JSON.stringify([]));
    }

    const restaurants = localStorage.getItem(RESTAURANTS) as string;
    return JSON.parse(restaurants);
  }

  private addRestaurantToLocalStorage(newRestuarant: RestaurantType) {
    const newRestaurants = [
      ...this.getResturantsFromLocalStorage(),
      newRestuarant,
    ];
    localStorage.setItem(RESTAURANTS, JSON.stringify(newRestaurants));
  }

  getCategory() {
    return this.category;
  }

  getSortingStandard() {
    return this.sortingStandard;
  }

  getFilter() {
    return this.filter;
  }

  private filterByCategory(restaurant: RestaurantType) {
    return this.category === "전체" || restaurant.category === this.category;
  }

  private filterByBookmark(restaurant: RestaurantType) {
    return this.filter === "all" || restaurant.bookmark === true;
  }

  private CompareFunction(a: RestaurantType, b: RestaurantType) {
    if (a[this.sortingStandard] < b[this.sortingStandard]) {
      return -1;
    } else {
      return 1;
    }
  }

  getRestaurants(): RestaurantType[] {
    const restaurants: RestaurantType[] = this.getResturantsFromLocalStorage();
    return restaurants
      .filter(this.filterByCategory)
      .filter(this.filterByBookmark)
      .toSorted(this.CompareFunction);
  }

  addRestaurant(restaurant: RestaurantType) {
    this.addRestaurantToLocalStorage(restaurant);
  }

  changeCategory(newCategory: Category | "전체") {
    this.category = newCategory;
  }

  changeSortingStandard(newSortingStandard: SortingStandard) {
    this.sortingStandard = newSortingStandard;
  }

  changeFilter(newFilter: "all" | "bookmark") {
    this.filter = newFilter;
  }

  toggleBookmark(name: string) {
    const newRestaurants = this.getResturantsFromLocalStorage().map(
      (restaurant) => {
        if (restaurant.name === name) {
          return { ...restaurant, bookmark: !restaurant.bookmark };
        }
        return restaurant;
      }
    );
    localStorage.setItem(RESTAURANTS, JSON.stringify(newRestaurants));
  }

  deleteRestaurant(name: string) {
    const newRestaurants = this.getResturantsFromLocalStorage().filter(
      (restaurant) => restaurant.name !== name
    );
    localStorage.setItem(RESTAURANTS, JSON.stringify(newRestaurants));
  }
}

export default new RestauranStorage();
