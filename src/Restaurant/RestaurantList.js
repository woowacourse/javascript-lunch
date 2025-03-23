import "./RestaurantList.css";
import { restaurantsData } from "../../public/database/restaurants";
import renderRestaurantElement from "./RestaurantItem";
import createCategoryFilter from "../components/Filter/CategoryFilter";
import createSortFilter from "../components/Filter/SortFilter";
import StorageItem from "./StorageManager";

class RestaurantList {
  selectedCategory;
  selectedSort;
  selectedTab;

  constructor() {
    const storedRestaurants = StorageItem.getItem("restaurants");
    this.restaurants = storedRestaurants
      ? storedRestaurants
      : [...restaurantsData];

    const storedCategory = StorageItem.getItem("category");
    const storedSort = StorageItem.getItem("sort");
    const storedTab = StorageItem.getItem("tab");

    this.selectedCategory = storedCategory ? storedCategory : "전체";
    this.selectedSort = storedSort ? storedSort : "name";
    this.selectedTab = storedTab ? storedTab : "allTab";

    this.restaurantListElement = null;
  }

  setSelectedCategory(category) {
    this.selectedCategory = category;
    StorageItem.setItem("category", category);
  }

  setSelectedSort(sortOption) {
    this.selectedSort = sortOption;
    StorageItem.setItem("sort", sortOption);
  }

  setSelectedTab(tab) {
    this.selectedTab = tab;
    StorageItem.setItem("tab", tab);
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
    if (!restaurant) return;

    const item = document.querySelector(`[data-name="${name}"]`);
    const starIcon = item.querySelector(".star-icon");
    starIcon.src = !restaurant.isFavorite
      ? "images/star.png"
      : "images/empty-star.png";
    restaurant.isFavorite = !restaurant.isFavorite;

    const storedRestaurants = StorageItem.getItem("restaurants");
    const newData = storedRestaurants.map((data) => {
      if (data.name === name) {
        return { ...data, isFavorite: !data.isFavorite };
      }
      return data;
    });
    StorageItem.setItem("restaurants", newData);
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

    if (this.selectedSort === "name") {
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
    StorageItem.setItem("restaurants", this.restaurants);
    this.restaurantListElement.innerHTML = "";

    if (this.selectedTab === "allTab") {
      this.renderAllTabData();
    } else {
      this.renderFavoriteData();
    }
  }

  addRestaurant(newRestaurant) {
    this.restaurants.push(newRestaurant);
    this.render();
  }
}

export default RestaurantList;
