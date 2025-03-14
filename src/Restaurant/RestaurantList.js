import "./RestaurantList.css";
import { restaurantsData } from "../../public/database/restaurants";
import renderRestaurantElement from "./RestaurantItem";

class RestaurantList {
  selectedCategory = "전체";
  selectedSort = "이름순";
  // selectedTab = "전체";

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

    let categoryFilteredData;
    let sortFilteredData;

    // 카테고리 필터
    if (this.selectedCategory === "전체") {
      categoryFilteredData = this.restaurants;
    } else {
      categoryFilteredData = this.restaurants.filter(
        (restaurant) => restaurant.category == this.selectedCategory
      );
    }

    // 정렬 필터
    if (this.selectedSort === "이름순") {
      sortFilteredData = categoryFilteredData
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name, "ko"));
    } else {
      sortFilteredData = categoryFilteredData
        .slice()
        .sort((a, b) => a.distance - b.distance);
    }

    // 즐겨찾기 필터

    sortFilteredData.forEach((restaurant) => {
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
