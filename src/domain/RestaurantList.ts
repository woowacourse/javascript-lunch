import { Restaurant, RestaurantForm, Category } from "./Restaurant";

export class RestaurantList {
  private list: Restaurant[] = [];

  add(restaurantInfo: RestaurantForm) {
    this.list = [...this.list, new Restaurant(restaurantInfo)];
    this.filterAll();
  }

  get listRestaurant(): Restaurant[] {
    return this.list;
  }

  filterAll() {
    const restaurantString = JSON.stringify(
      this.list.map((info) => info.information)
    );
    window.localStorage.clear();
    window.localStorage.setItem("restaurants", restaurantString);
  }

  categoryFilter(category: Category) {
    const filteredList: RestaurantForm[] = [];
    if (category === "전체") {
      this.filterAll();
      return;
    }

    this.list.filter((info) => {
      if (info.information.category === category)
        filteredList.push(info.information);
    });

    const restaurantString = JSON.stringify(filteredList);
    window.localStorage.clear();
    window.localStorage.setItem("restaurants", restaurantString);
    // console.log(window.localStorage.getItem("restaurants"));
    return filteredList;
  }
}
