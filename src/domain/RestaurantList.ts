import { RestaurantForm, Category } from "./Restaurant";

export default class RestaurantList {
  private formList: RestaurantForm[] = [];

  constructor() {
    const parsedRestaurants = JSON.parse(
      localStorage.getItem("restaurants") || "[]"
    );
    if (parsedRestaurants.length !== 0)
      parsedRestaurants.forEach((restaurant: RestaurantForm) => {
        this.formList = [...this.formList, restaurant];
      });
  }

  get listRestaurant(): RestaurantForm[] {
    return this.formList;
  }

  add(restaurantInfo: RestaurantForm) {
    this.formList = [...this.formList, restaurantInfo];
    this.filterAll();
  }

  filterAll() {
    const restaurantString = JSON.stringify(this.formList.map((info) => info));
    window.localStorage.setItem("restaurants", restaurantString);
  }

  categoryFilter(category: Category) {
    const filteredList: RestaurantForm[] = [];
    if (category === "전체") {
      this.filterAll();
      return;
    }
    this.formList.filter((info) => {
      if (info.category === category) filteredList.push(info);
    });
    window.localStorage.setItem("restaurants", JSON.stringify(filteredList));
    return filteredList;
  }
}
