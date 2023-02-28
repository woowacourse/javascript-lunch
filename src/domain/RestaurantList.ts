import Restaurant from "./Restaurant";

type Category = "한식" | "중식" | "일식" | "아시안" | "양식" | "기타";

type Distance = 5 | 10 | 15 | 20 | 30;

interface RestaurantInfo {
  name: string;
  category: Category;
  distance: Distance;
  description?: string;
  url?: string;
}

export default class RestaurantList {
  #restaurantList: Restaurant[];

  constructor() {
    this.#restaurantList = [];
  }

  getRestaurantList(): Restaurant[] {
    return [...this.#restaurantList];
  }

  addRestaurant(info: RestaurantInfo): void {
    this.#restaurantList.push(new Restaurant(info));
  }

  sortListByName(): void {
    this.#restaurantList.sort((a, b) =>
      a.getInfo().name > b.getInfo().name ? 1 : -1
    );
  }

  sortListByDistance(): void {
    this.#restaurantList.sort(
      (a, b) => a.getInfo().distance - b.getInfo().distance
    );
  }

  getFilteredListByCategory(category: Category) {
    return this.#restaurantList.filter(
      (restaurant) => restaurant.getInfo().category === category
    );
  }
}
