import { Restaurant, RestaurantForm, Category } from "./Restaurant";

export class RestaurantList {
  private list: RestaurantForm[] = [];

  constructor() {
    const res = JSON.parse(localStorage.getItem("restaurants") || "[]");
    if (res.length !== 0)
      res.forEach((val: RestaurantForm) => {
        this.list.push(val);
      });
  }

  add(restaurantInfo: RestaurantForm) {
    this.list = [...this.list, restaurantInfo];

    this.filterAll();
  }

  get listRestaurant(): RestaurantForm[] {
    return this.list;
  }

  filterAll() {
    const restaurantString = JSON.stringify(this.list.map((info) => info));
    window.localStorage.setItem("restaurants", restaurantString);
  }

  categoryFilter(category: Category) {
    const filteredList: RestaurantForm[] = [];
    if (category === "전체") {
      this.filterAll();
      return;
    }

    this.list.filter((info) => {
      if (info.category === category) filteredList.push(info);
    });

    const restaurantString = JSON.stringify(filteredList);
    window.localStorage.setItem("restaurants", restaurantString);
    return filteredList;
  }
}
