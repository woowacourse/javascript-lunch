import { Restaurant, Category, SortingStandard, isLink } from "../types";
import { deepCopy } from "../util";
import { categories, distances } from "../constants";

class RestaurantList {
  private restaurants;

  constructor(restaurants: Restaurant[]) {
    this.restaurants = restaurants.map((restaurant) => deepCopy(restaurant));
  }

  getRestaurants({
    category,
    sortingStandard,
  }: {
    category: Category | "전체";
    sortingStandard: SortingStandard;
  }): Restaurant[] {
    if (category === "전체") {
      return this.restaurants
        .map((restaurant) => deepCopy(restaurant))
        .sort((a, b) => {
          if (a[sortingStandard] < b[sortingStandard]) {
            return -1;
          } else if (a[sortingStandard] < b[sortingStandard]) {
            return 1;
          }
          return 0;
        });
    }

    return this.restaurants
      .map((restaurant) => deepCopy(restaurant))
      .filter((restaurant) => restaurant.category === category)
      .sort((a, b) => {
        if (a[sortingStandard] < b[sortingStandard]) {
          return -1;
        } else if (a[sortingStandard] < b[sortingStandard]) {
          return 1;
        }
        return 0;
      });
  }

  add(restaurant: Restaurant) {
    this.validateRestaurant(restaurant);

    this.restaurants = [...this.restaurants, deepCopy(restaurant)];
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

export default RestaurantList;
