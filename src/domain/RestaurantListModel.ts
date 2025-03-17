type RestaurantList = RestaurantItem[];

interface RestaurantItem {
  category: "한식" | "양식" | "일식" | "중식" | "아시안" | "기타";
  name: string;
  distance: 5 | 10 | 15 | 20 | 30;
  link: string;
  bookmark: boolean;
  id: number;
}

export default class RestaurantListModel {
  #restaurantList;

  constructor(restaurantList: RestaurantList) {
    this.#restaurantList = restaurantList;
  }

  updateRestautantList(newRestaurantList: RestaurantList) {
    this.#restaurantList = [...newRestaurantList];
  }

  getRestaurantList(): RestaurantList {
    return this.#restaurantList;
  }
}
