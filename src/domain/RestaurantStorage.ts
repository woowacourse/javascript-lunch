import { RestaurantType, Category, SortingStandard } from "../types";
import { RESTAURANTS } from "../constants";

const getResturantsFromLocalStorage = (): RestaurantType[] => {
  if (!localStorage.getItem(RESTAURANTS)) {
    localStorage.setItem(RESTAURANTS, JSON.stringify([]));
  }

  const restaurants = localStorage.getItem(RESTAURANTS) as string;
  return JSON.parse(restaurants);
};

const addRestaurantToLocalStorage = (newRestuarant: RestaurantType) => {
  const newRestaurants = [...getResturantsFromLocalStorage(), newRestuarant];
  localStorage.setItem(RESTAURANTS, JSON.stringify(newRestaurants));
};

class RestauranStorage {
  category: Category | "전체" = "전체";
  sortingStandard: SortingStandard = "name";
  filter = "all";

  getCategory() {
    return this.category;
  }

  getSortingStandard() {
    return this.sortingStandard;
  }

  getFilter() {
    return this.filter;
  }

  getRestaurants(): RestaurantType[] {
    const restaurants: RestaurantType[] = getResturantsFromLocalStorage();
    return restaurants
      .filter(
        (restaurant) =>
          this.category === "전체" || restaurant.category === this.category
      )
      .filter(
        (restaurant) => this.filter === "all" || restaurant.bookmark === true
      )
      .toSorted((a, b) => {
        if (a[this.sortingStandard] < b[this.sortingStandard]) {
          return -1;
        } else {
          return 1;
        }
      });
  }

  addRestaurant(restaurant: RestaurantType) {
    addRestaurantToLocalStorage(restaurant);
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
    const newRestaurants = getResturantsFromLocalStorage().map((restaurant) => {
      if (restaurant.name === name) {
        return { ...restaurant, bookmark: !restaurant.bookmark };
      }
      return restaurant;
    });
    localStorage.setItem(RESTAURANTS, JSON.stringify(newRestaurants));
  }
}

export default new RestauranStorage();
