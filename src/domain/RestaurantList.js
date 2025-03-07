import Restaurant from "./Restaurant.js";

class RestaurantList {
  #restaurants;
  constructor(listItemContents) {
    this.#restaurants = this.initialAddRestaurant(listItemContents);
  }

  initialAddRestaurant(listItemContents) {
    return listItemContents.map((listItemContent) => new Restaurant(listItemContent));
  }

  addRestaurant(restaurantInformation) {
    const newRestaurant = new Restaurant(restaurantInformation);
    this.#restaurants.push(newRestaurant);
    return newRestaurant;
  }

  get resaurants() {
    return [...this.#restaurants];
  }
}

export default RestaurantList;
