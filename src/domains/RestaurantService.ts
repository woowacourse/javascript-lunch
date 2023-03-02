import { AllCategory, Category, Restaurant } from "./types";

class RestaurantService {
  private restaurantList: Restaurant[];

  constructor() {
    this.restaurantList = JSON.parse(
      localStorage.getItem("restaurants") ?? "[]"
    );
    console.log(this.restaurantList);
  }

  add(restaurant: Restaurant) {
    this.restaurantList.push(restaurant);
    localStorage.setItem("restaurants", JSON.stringify(this.restaurantList));
  }

  filter(category: AllCategory | Category) {
    if (category === "전체") return [...this.restaurantList];

    return this.restaurantList.filter(
      (restaurant) => restaurant.category === category
    );
  }

  sortByName(restaurantList: Restaurant[] = this.restaurantList) {
    return [...restaurantList].sort((a, b) => a.name.localeCompare(b.name));
  }

  sortByDistance(restaurantList: Restaurant[] = this.restaurantList) {
    return [...restaurantList].sort((a, b) => a.distance - b.distance);
  }
}

export default RestaurantService;
