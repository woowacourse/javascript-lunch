import { RestaurantData } from "../constants/RestaurantData.js";
import Header from "./Header/Header.js";
import Modal from "./Modal/Modal.js";
import {
  AddRestaurantContent,
  RestaurantInfoContent,
} from "./Modal/getModalContent.js";
import Tab from "./Tab/tab.js";
import {
  createCategoryFilter,
  createSortingFilter,
} from "./Dropdown/FilterDropdown/createFilterSelect.js";
import filterByCategory from "../utils/filterRestaurants.js";
import renderRestaurants from "./renderRestaurants.js";
import sortByOption from "../utils/sortRestaurants.js";
import storageUtil from "./storageUtil.js";

class App {
  constructor($target) {
    this.$target = $target;
    this.state = this.initState();
    this.tab = new Tab(document.querySelector(".tab-container"), {
      activeTab: this.state.activeTab,
    });

    this.setupEventListeners();

    this.render();
  }

  initState() {
    const savedData = storageUtil.get("restaurantList");
    const savedFavorites = storageUtil.get("favoriteRestaurantList");

    if (!savedData) {
      storageUtil.add("restaurantList", RestaurantData);
    }
    if (!savedFavorites) {
      storageUtil.add("favoriteRestaurantList", []);
    }
    return {
      isModalOpen: false,
      restaurantList: savedData ? savedData : [...RestaurantData],
      favoriteRestaurants: savedFavorites ? savedFavorites : [],
      selectedCategory: "전체",
      sortOption: "name",
      selectedRestaurant: null,
      activeTab: "all",
    };
  }

  setupEventListeners() {
    document.addEventListener("tabClicked", this.activateMain);
    document.addEventListener("restaurantUpdated", this.updateRestaurant);
    document.addEventListener("restaurantDeleted", this.deleteRestaurant);
    document.addEventListener("favoriteUpdated", (event) => {
      this.state = {
        ...this.state,
        favoriteRestaurants: event.detail.favoriteRestaurants,
      };
      this.render();
    });
  }

  render() {
    new Header(document.querySelector(".gnb"), {
      toggleModal: this.toggleModal,
    });

    if (this.state.activeTab === "all") {
      this.showAllRestaurants();
    } else {
      this.showFavoriteRestaurants();
    }

    new Modal(document.querySelector(".modal"), {
      isModalOpen: this.state.isModalOpen,
      toggleModal: this.toggleModal,
      content: this.state.selectedRestaurant
        ? RestaurantInfoContent(this.state.selectedRestaurant)
        : AddRestaurantContent(),
      modalType: this.state.selectedRestaurant ? "info" : "add",
    });
  }

  showAllRestaurants() {
    renderRestaurants(this.state.restaurantList, (restaurant) => {
      this.toggleModal(restaurant);
    });

    createCategoryFilter((selectedCategory) => {
      this.filterRestaurants(selectedCategory);
    }, this.state.selectedCategory);

    createSortingFilter((sortOption) => {
      this.sortRestaurants(sortOption);
    }, this.state.sortOption);
  }

  showFavoriteRestaurants() {
    const favoriteRestaurants = this.state.restaurantList.filter((restaurant) =>
      this.state.favoriteRestaurants.includes(restaurant.id),
    );

    renderRestaurants(favoriteRestaurants, (restaurant) => {
      this.toggleModal(restaurant);
    });
  }

  toggleModal = (restaurantData = null) => {
    this.state = {
      ...this.state,
      isModalOpen: !this.state.isModalOpen,
      selectedRestaurant: restaurantData,
    };

    this.render();
  };

  activateMain = (event) => {
    const { targetTabTitle } = event.detail;

    this.state = {
      ...this.state,
      activeTab: targetTabTitle,
    };

    this.tab.updateActiveTab(targetTabTitle);
    this.render();
  };

  filterRestaurants(selectedCategory) {
    const filtered = filterByCategory(
      storageUtil.get("restaurantList"),
      selectedCategory,
    );

    this.state = {
      ...this.state,
      restaurantList: filtered,
      selectedCategory,
    };

    this.render();
  }

  sortRestaurants(sortOption) {
    const sorted = sortByOption(this.state.restaurantList, sortOption);

    this.state = {
      ...this.state,
      restaurantList: sorted,
      sortOption,
    };

    this.render();
  }

  updateRestaurant = (event) => {
    const newRestaurantList = [...this.state.restaurantList];
    newRestaurantList.push(event.detail.information);
    storageUtil.add("restaurantList", newRestaurantList);

    this.state = {
      ...this.state,
      restaurantList: newRestaurantList,
    };

    this.render();
  };

  deleteRestaurant = (event) => {
    const restaurantId = event.detail.restaurantId;
    const newRestaurantList = this.state.restaurantList.filter(
      (restaurant) => restaurant.id !== restaurantId,
    );
    storageUtil.add("restaurantList", newRestaurantList);
    const newFavoriteRestaurants = this.state.favoriteRestaurants.filter(
      (id) => id !== restaurantId,
    );
    storageUtil.add("favoriteRestaurantList", newFavoriteRestaurants);
    this.state = {
      ...this.state,
      restaurantList: newRestaurantList,
      favoriteRestaurants: newFavoriteRestaurants,
      selectedRestaurant: null,
    };
    this.render();
  };
}

export default App;
