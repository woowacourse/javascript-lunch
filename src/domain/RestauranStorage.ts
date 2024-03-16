import { RestaurantType, Category, SortingStandard } from "../types";
import { RESTAURANTS } from "../constants";

const getResturantsFromLocalStorage = (): RestaurantType[] => {
  if (!localStorage.getItem(RESTAURANTS)) {
    localStorage.setItem(RESTAURANTS, JSON.stringify([]));
  }

  const restaurants = localStorage.getItem(RESTAURANTS) as string;
  return JSON.parse(restaurants);
};

const setRestaurantsToLocalStorage = (newRestuarant: RestaurantType) => {
  const newRestaurants = [...getResturantsFromLocalStorage(), newRestuarant];
  localStorage.setItem(RESTAURANTS, JSON.stringify(newRestaurants));
};

class RestauranStorage {
  category: Category | "전체" = "전체";
  sortingStandard: SortingStandard = "name";
  filter = "all";

  getRestaurants(): RestaurantType[] {
    const restaurants: RestaurantType[] = getResturantsFromLocalStorage();
    if (this.category === "전체") {
      return restaurants.toSorted((a, b) => {
        if (a[this.sortingStandard] < b[this.sortingStandard]) {
          return -1;
        } else {
          return 1;
        }
      });
    }

    return restaurants
      .filter((restaurant) => restaurant.category === this.category)
      .toSorted((a: any, b: any) => {
        if (a[this.sortingStandard] < b[this.sortingStandard]) {
          return -1;
        } else {
          return 1;
        }
      });
  }

  addRestaurant(restaurant: RestaurantType) {
    setRestaurantsToLocalStorage(restaurant);
  }

  changeCategory(newCategory: Category) {
    this.category = newCategory;
  }

  changeSortingStandard(newSortingStandard: SortingStandard) {
    this.sortingStandard = newSortingStandard;
  }

  changeFilter(newFilter: "all" | "bookmark") {
    this.filter = newFilter;
  }
}

export default new RestauranStorage();
