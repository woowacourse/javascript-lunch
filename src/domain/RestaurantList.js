import Restaurant from "./Restaurant.js";

class RestaurantList {
  #restaurants;
  constructor(listItemContents) {
    const storedRestaurants = localStorage.getItem("restaurants");
    if (storedRestaurants) {
      this.#restaurants = JSON.parse(storedRestaurants).map(({ information }) => new Restaurant(information));
    } else {
      this.#restaurants = this.initialAddRestaurant(listItemContents);
      this.updateLocalStorage();
    }
  }

  initialAddRestaurant(listItemContents) {
    return listItemContents.map((listItemContent) => new Restaurant(listItemContent));
  }

  addRestaurant(restaurantInformation) {
    const newRestaurant = new Restaurant(restaurantInformation);
    this.#restaurants.push(newRestaurant);
    this.updateLocalStorage();
    return newRestaurant;
  }

  updateLocalStorage() {
    localStorage.setItem("restaurants", JSON.stringify(this.#restaurants));
  }

  get resaurants() {
    return [...this.#restaurants];
  }
}

export default RestaurantList;
