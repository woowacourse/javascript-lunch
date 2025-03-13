import { restaurantsData } from "../constants/restaurantsMockData";
import renderRestaurantElement from "./RestaurantItem";

class RestaurantList {
  constructor() {
    this.restaurants = [...restaurantsData];
    this.restaurantListElement = null;
  }

  createRestaurantList() {
    const restaurantListContainer = document.querySelector(
      ".restaurant-list-container"
    );

    const restaurantListHTML = `<ul class="restaurant-list"></ul>`;
    restaurantListContainer.insertAdjacentHTML("beforeend", restaurantListHTML);

    this.restaurantListElement = document.querySelector(".restaurant-list");
    this.render();
  }

  render() {
    if (!this.restaurantListElement) return;

    this.restaurantListElement.innerHTML = "";
    this.restaurants.forEach((restaurant) => {
      const restaurantItem = renderRestaurantElement(restaurant);
      this.restaurantListElement.appendChild(restaurantItem);
    });
  }

  addRestaurant(newRestaurant) {
    this.restaurants.push(newRestaurant);
    console.log(this.restaurants);
    this.render();
  }
}

export default RestaurantList;
