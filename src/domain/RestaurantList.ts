import { Restaurant, RestaurantForm, Category } from "./Restaurant";

export class RestaurantList {
  private list: Restaurant[] = [];

  add(restaurantInfo: RestaurantForm) {
    this.list = [...this.list, new Restaurant(restaurantInfo)];
  }

  get listRestaurant(): Restaurant[] {
    return this.list;
  }

  categoryFilter(category: Category) {
    const filteredList: RestaurantForm[] = [];
    this.list.filter((info) => {
      if (info.information.category === category)
        filteredList.push(info.information);
    });
    return filteredList;
  }
}
