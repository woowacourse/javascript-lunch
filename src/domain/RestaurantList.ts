import { Restaurant, Category, SortingStandard, Link, isLink } from "../types";
import {
  deepCopy,
  getRestaurantsFromLocalStorage,
  setRestaurantsToLocalStorage,
} from "../util";
import { categories, distances } from "../constants";

class RestaurantList {
  getRestaurants({
    category,
    sortingStandard,
  }: {
    category: Category | "전체";
    sortingStandard: SortingStandard;
  }): Restaurant[] {
    const restaurants: Restaurant[] = getRestaurantsFromLocalStorage();
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
    this.validateRestaurant(restaurant);

    setRestaurantsToLocalStorage(restaurant);
  }

  private validateRestaurant(restaurant: Restaurant) {
    if (!categories.includes(restaurant.category)) {
      throw new Error("잘못된 카테고리입니다.");
    }

    if (restaurant.name.trim() === "") {
      throw new Error("잘못된 이름입니다.");
    }

    if (!distances.includes(restaurant.distance)) {
      throw new Error("잘못된 거리입니다.");
    }

    if (restaurant.link && !isLink(restaurant.link)) {
      throw new Error("잘못된 참고 링크입니다.");
    }
  }
}

const restaurantList = new RestaurantList();
export default restaurantList;
