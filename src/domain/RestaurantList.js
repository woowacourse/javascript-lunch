import Restaurant from "./Restaurant.js";

class RestaurantList {
  #restaurants;
  constructor(listItemContents) {
    this.#restaurants = this.initialAddRestaurant(listItemContents);
  }

  initialAddRestaurant(listItemContents) {
    return listItemContents.map((listItemContent) => new Restaurant(listItemContent));
  }

  get resaurants() {
    console.log(this.#restaurants);
    return [...this.#restaurants];
  }
}

export default RestaurantList;
