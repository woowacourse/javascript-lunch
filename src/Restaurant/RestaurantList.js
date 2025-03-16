import "./RestaurantList.css";
import { restaurantsData } from "../../public/database/restaurants";
import renderRestaurantElement from "./RestaurantItem";

class RestaurantList {
  selectedCategory = "전체";
  selectedSort = "이름순";
  selectedTab = "allTab";

  constructor() {
    this.restaurants = [...restaurantsData];
    this.restaurantListElement = null;
  }

  setSelectedCategory(category) {
    this.selectedCategory = category;
  }

  setSelectedSort(sortOption) {
    this.selectedSort = sortOption;
  }

  setSelectedTab(tab) {
    this.selectedTab = tab;
  }

  createRestaurantList() {
    const restaurantListContainer = document.querySelector(
      ".restaurant-list-container"
    );

    const restaurantListHTML = `<ul class="restaurant-list"></ul>`;
    restaurantListContainer.insertAdjacentHTML("beforeend", restaurantListHTML);

    this.restaurantListElement = document.querySelector(".restaurant-list");
    this.renderFilteredData();
    this.renderFavoriteData();
  }

  renderFilteredData() {
    this.restaurantListElement.innerHTML = "";

    let categoryFilteredData;
    let sortFilteredData;

    if (this.selectedCategory === "전체") {
      categoryFilteredData = this.restaurants;
    } else {
      categoryFilteredData = this.restaurants.filter(
        (restaurant) => restaurant.category == this.selectedCategory
      );
    }

    if (this.selectedSort === "이름순") {
      sortFilteredData = categoryFilteredData
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name, "ko"));
    } else {
      sortFilteredData = categoryFilteredData
        .slice()
        .sort((a, b) => a.distance - b.distance);
    }

    sortFilteredData.forEach((restaurant) => {
      const restaurantItem = renderRestaurantElement(restaurant);
      this.restaurantListElement.appendChild(restaurantItem);
    });
  }

  renderFavoriteData() {
    this.restaurantListElement.innerHTML = "";

    let tabFilteredData;

    if (this.selectedTab === "allTab") {
      tabFilteredData = this.restaurants;
    } else {
      tabFilteredData = this.restaurants.filter(
        (restaurant) => restaurant.isFavorite === true
      );
    }

    tabFilteredData.forEach((restaurant) => {
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
