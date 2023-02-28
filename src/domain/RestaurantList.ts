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

  addRestaurant(info: RestaurantInfo): void {
    this.#restaurantList.push(new Restaurant(info));
  }

  getSortedListByName(): Restaurant[] {
    return this.#restaurantList.sort((a, b) =>
      a.getInfo().name > b.getInfo().name ? 1 : -1
    );
  }
}
