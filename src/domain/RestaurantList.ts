import { Restaurant, Category, SortingStandard, Link } from "../types";
import { deepCopy } from "../util";
import { CATEGORIES, DISTANCES, RESTAURANTS } from "../constants";

function getResturantsFromLocalStorage(): Restaurant[] {
  if (!localStorage.getItem(RESTAURANTS)) {
    localStorage.setItem(RESTAURANTS, JSON.stringify([]));
  }

  const restaurants = localStorage.getItem(RESTAURANTS) as string;

  return JSON.parse(restaurants);
}

function setRestaurantsToLocalStorage(newRestuarant: Restaurant) {
  const newRestaurants = [...getResturantsFromLocalStorage(), newRestuarant];
  localStorage.setItem(RESTAURANTS, JSON.stringify(newRestaurants));
}

class RestaurantList {
  getRestaurants({
    category,
    sortingStandard,
  }: {
    category: Category | "전체";
    sortingStandard: SortingStandard;
  }): Restaurant[] {
    const restaurants: Restaurant[] = getResturantsFromLocalStorage();
    if (category === "전체") {
      return restaurants.toSorted((a, b) => {
        if (a[sortingStandard] < b[sortingStandard]) {
          return -1;
        } else {
          return 1;
        }
      });
    }

    return restaurants
      .filter((restaurant) => restaurant.category === category)
      .toSorted((a, b) => {
        if (a[sortingStandard] < b[sortingStandard]) {
          return -1;
        } else {
          return 1;
        }
      });
  }

  add(restaurant: Restaurant) {
    setRestaurantsToLocalStorage(restaurant);
  }
}

const restaurantList = new RestaurantList();
export default restaurantList;
