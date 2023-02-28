type Category = "한식" | "중식" | "일식" | "아시안" | "양식" | "기타";

type Distance = 5 | 10 | 15 | 20 | 30;

interface RestaurantInfo {
  name: string;
  category: Category;
  distance: Distance;
  description?: string;
  url?: string;
}

export default class Restaurant {
  #info: RestaurantInfo;

  constructor(info: RestaurantInfo) {
    this.#info = info;
  }

  getInfo(): RestaurantInfo {
    return this.#info;
  }
}
