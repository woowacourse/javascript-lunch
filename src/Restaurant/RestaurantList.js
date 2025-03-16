import "./RestaurantList.css";
import { restaurantsData } from "../../public/database/restaurants";
import renderRestaurantElement from "./RestaurantItem";
import createTabFilter from "../components/Tab/tabFilter";
import createCategoryFilter from "../components/Filter/CategoryFilter";
import createSortFilter from "../components/Filter/SortFilter";

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

    this.render();
  }

  updateFavoriteStatus(name) {
    const restaurant = this.restaurants.find((r) => r.name === name);
    if (!restaurant) return; // 해당 레스토랑이 없으면 아무것도 하지 않음

    restaurant.isFavorite = !restaurant.isFavorite; // isFavorite 값 반전
    this.render(); // UI 다시 렌더링
  }

  deleteRestaurant(name) {
    this.restaurants = this.restaurants.filter(
      (restaurant) => restaurant.name !== name
    );
    this.render();
  }

  renderFilter() {
    const addrestaurant_filter_container = document.querySelector(
      ".restaurant-filter-container"
    );
    addrestaurant_filter_container.innerHTML = "";
    createCategoryFilter(this);
    createSortFilter(this);
  }

  renderAllTabData() {
    this.renderFilter();
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
      const restaurantItem = renderRestaurantElement(
        restaurant,
        (name) => this.updateFavoriteStatus(name),
        (name) => this.deleteRestaurant(name)
      );
      this.restaurantListElement.appendChild(restaurantItem);
    });
  }

  renderFavoriteData() {
    const addrestaurant_filter_container = document.querySelector(
      ".restaurant-filter-container"
    );
    addrestaurant_filter_container.innerHTML = "";
    const favoriteData = this.restaurants.filter(
      (restaurant) => restaurant.isFavorite === true
    );
    favoriteData.forEach((restaurant) => {
      const restaurantItem = renderRestaurantElement(
        restaurant,
        (name) => this.updateFavoriteStatus(name),
        (name) => this.deleteRestaurant(name)
      );
      this.restaurantListElement.appendChild(restaurantItem);
    });
  }

  render() {
    this.restaurantListElement.innerHTML = "";

    if (this.selectedTab === "allTab") {
      this.renderAllTabData();
    } else {
      this.renderFavoriteData();
    }
  }

  addRestaurant(newRestaurant) {
    this.restaurants.push(newRestaurant);
    console.log(this.restaurants);
    this.render();
  }
}

export default RestaurantList;
