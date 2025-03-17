import "./RestaurantList.css";
import { restaurantsData } from "../../public/database/restaurants";
import renderRestaurantElement from "./RestaurantItem";
import createTabFilter from "../components/Tab/tabFilter";
import createCategoryFilter from "../components/Filter/CategoryFilter";
import createSortFilter from "../components/Filter/SortFilter";

class RestaurantList {
  selectedCategory;
  selectedSort;
  selectedTab;

  constructor() {
    const storedRestaurants = JSON.parse(localStorage.getItem("restaurants"));
    this.restaurants = storedRestaurants
      ? storedRestaurants
      : [...restaurantsData];

    const storedCategory = JSON.parse(localStorage.getItem("category"));
    const storedSort = JSON.parse(localStorage.getItem("sort"));
    const storedTab = JSON.parse(localStorage.getItem("tab"));

    this.selectedCategory = storedCategory ? storedCategory : "전체";
    this.selectedSort = storedSort ? storedSort : "이름순";
    this.selectedTab = storedTab ? storedTab : "allTab";

    this.restaurantListElement = null;
  }

  setSelectedCategory(category) {
    localStorage.setItem("category", JSON.stringify(category));
    this.selectedCategory = category;
  }

  setSelectedSort(sortOption) {
    this.selectedSort = sortOption;
    localStorage.setItem("sort", JSON.stringify(sortOption));
  }

  setSelectedTab(tab) {
    this.selectedTab = tab;
    localStorage.setItem("tab", JSON.stringify(tab));
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
        (restaurant) => restaurant.category === this.selectedCategory
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
    localStorage.setItem("restaurants", JSON.stringify(this.restaurants));
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
