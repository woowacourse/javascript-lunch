import { RestaurantType, Category, SortingStandard } from "../types";
import { RESTAURANTS } from "../constants";

function getResturantsFromLocalStorage(): RestaurantType[] {
  if (!localStorage.getItem(RESTAURANTS)) {
    localStorage.setItem(RESTAURANTS, JSON.stringify([]));
  }

  const restaurants = localStorage.getItem(RESTAURANTS) as string;

  return JSON.parse(restaurants);
}

function setRestaurantsToLocalStorage(newRestuarant: RestaurantType) {
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
  }): RestaurantType[] {
    const restaurants: RestaurantType[] = getResturantsFromLocalStorage();
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

  add(restaurant: RestaurantType) {
    setRestaurantsToLocalStorage(restaurant);
  }
}

const restaurantList = new RestaurantList();
export default restaurantList;
