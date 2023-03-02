export type Category = "한식" | "중식" | "양식" | "일식" | "아시안" | "기타";
type Distance = 5 | 10 | 15 | 20 | 30;

export interface RestaurantForm {
  category: Category;
  name: string;
  distance: Distance;
  description?: string;
  link?: string;
}

export class Restaurant {
  #information: RestaurantForm;

  constructor(restaurantInfo: RestaurantForm) {
    this.#information = restaurantInfo;
  }

  get information() {
    return this.#information;
  }
}
