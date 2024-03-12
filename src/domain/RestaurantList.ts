import { Restaurant, Category, SortingStandard, isLink } from "../types";
import { deepCopy } from "../util";
import { categories, distances } from "../constants";

class RestaurantList {
  private restaurants;

  constructor(restaurants: Restaurant[]) {
    restaurants.forEach((restaurant) => this.validateRestaurant(restaurant));
    this.restaurants = restaurants.map((restaurant) => deepCopy(restaurant));
  }

  getRestaurant(id: number): Restaurant {
    const restaurant = this.restaurants.find(
      (restaurant) => restaurant.id === id
    );
    if (restaurant === undefined) {
      throw new Error("음식점이 없습니다.");
    }

    return restaurant;
  }

  removeRestaurant(id: number) {
    this.restaurants = this.restaurants.filter(
      (restaurant) => restaurant.id !== id
    );
  }

  getRestaurants({
    category,
    sortingStandard,
    isGoToFilter = false,
  }: {
    category: Category | "전체";
    sortingStandard: SortingStandard;
    isGoToFilter?: boolean;
  }): Restaurant[] {
    const copiedRestaurants = this.restaurants.map((restaurant) =>
      deepCopy(restaurant)
    );

    return this.sort(
      this.filterIsGoTo(
        this.filterCategory(copiedRestaurants, category),
        isGoToFilter
      ),
      sortingStandard
    );
  }

  add(restaurant: Restaurant) {
    this.validateRestaurant(restaurant);

    this.restaurants = [...this.restaurants, deepCopy(restaurant)];
  }

  private filterCategory(
    restaurants: Restaurant[],
    category: Category | "전체"
  ) {
    if (category === "전체") {
      return restaurants;
    }
    return restaurants.filter((restaurant) => restaurant.category === category);
  }

  private filterIsGoTo(restaurants: Restaurant[], isGoToFilter: boolean) {
    if (!isGoToFilter) {
      return restaurants;
    }
    return restaurants.filter((restaurant) => restaurant.isGoTo);
  }

  private sort(restaurants: Restaurant[], sortingStandard: SortingStandard) {
    return restaurants.sort((a, b) => {
      if (a[sortingStandard] < b[sortingStandard]) {
        return -1;
      } else if (a[sortingStandard] < b[sortingStandard]) {
        return 1;
      }
      return 0;
    });
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
