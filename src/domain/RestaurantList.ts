import { Restaurant, Category, SortingStandard } from "../types";
import { deepCopy } from "../util";

function getResturantsFromLocalStorage(): Restaurant[] {
  if (!localStorage.getItem("restaurants")) {
    localStorage.setItem("restaurants", JSON.stringify([]));
  }

  const restaurants = localStorage.getItem("restaurants") as string;

  return JSON.parse(restaurants);
}

function setRestaurantsToLocalStorage(newRestuarant: Restaurant) {
  const newRestaurants = [...getResturantsFromLocalStorage(), newRestuarant];
  localStorage.setItem("restaurants", JSON.stringify(newRestaurants));
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
      return restaurants
        .sort((a, b) => {
          if (a[sortingStandard] < b[sortingStandard]) {
            return -1;
          } else if (a[sortingStandard] < b[sortingStandard]) {
            return 1;
          }
          return 0;
        })
        .map((restaurant) => deepCopy(restaurant));
    }

    return restaurants
      .filter((restaurant) => restaurant.category === category)
      .sort((a, b) => {
        if (a[sortingStandard] < b[sortingStandard]) {
          return -1;
        } else if (a[sortingStandard] < b[sortingStandard]) {
          return 1;
        }
        return 0;
      })
      .map((restaurant) => deepCopy(restaurant));
  }

  add(restaurant: Restaurant) {
    setRestaurantsToLocalStorage(restaurant);
  }
}

export default RestaurantList;
