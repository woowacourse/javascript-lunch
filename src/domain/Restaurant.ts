import { RestaurantType } from "../type";

export default class Restaurant {
  private info: RestaurantType = {
    category: "",
    name: "",
    distance: "",
    description: "",
    link: "",
  };

  constructor(restaurantInfo: RestaurantType) {
    this.info = restaurantInfo;
  }
}
