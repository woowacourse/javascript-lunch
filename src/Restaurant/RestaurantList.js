import "./RestaurantList.css";
import { restaurantsData } from "../constants/restaurantsMockData";
import renderRestaurantElement from "./RestaurantItem";

class RestaurantList {
  constructor(selectedCategory = "전체") {
    this.restaurants = [...restaurantsData];
    this.restaurantListElement = null;
    this.selectedCategory = selectedCategory;
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
    this.restaurantListElement.innerHTML = "";

    let filteredData;

    if (this.selectedCategory === "전체") {
      filteredData = this.restaurants;
    } else {
      filteredData = this.restaurants.filter(
        (restaurant) => restaurant.category == this.selectedCategory
      );
    }

    filteredData.forEach((restaurant) => {
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
