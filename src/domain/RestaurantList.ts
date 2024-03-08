import { Restaurant, Category, SortingStandard, Link } from "../types";
import { deepCopy } from "../util";
import { categories, distances } from "../constants";

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
    this.validateRestaurant(restaurant);

    setRestaurantsToLocalStorage(restaurant);
  }

  private validateRestaurant(restaurant: Restaurant) {
    if (!categories.includes(restaurant.category)) {
      throw new Error("잘못된 카테고리입니다.");
    }

    if (restaurant.name.trim() === "") {
      throw new Error("가게 이름을 입력해주세요.");
    }

    if (!distances.includes(restaurant.distance)) {
      throw new Error("거리가 잘못되었습니다.");
    }

    if (restaurant.link !== "" && !this.isLink(restaurant.link)) {
      throw new Error("잘못된 참고 링크입니다.");
    }
  }

  private isLink(value: any): value is Link {
    return (
      typeof value === "string" &&
      (value.startsWith("https://") || value.startsWith("http://"))
    );
  }
}

const restaurantList = new RestaurantList();
export default restaurantList;
