import { RestaurantData } from "../constants/RestaurantData.js";
import Component from "./Component.js";
import Header from "./Header/Header.js";
import Modal from "./Modal/Modal.js";
import {
  addResturantContent,
  restaurantInfoContent,
} from "./Modal/getModalContent.js";
import Tab from "./Tab/tab.js";
import {
  createCategoryFilter,
  createSortingFilter,
} from "./createFilterSelect.js";
import filterByCategory from "./filterRestaurants.js";
import renderRestaurants from "./renderRestaurants.js";
import sortByOption from "./sortRestaurants.js";
class App extends Component {
  constructor($target) {
    super($target);
    this.state = this.initState();
    this.tab = new Tab(document.querySelector(".tab-container"), {
      activeTab: this.state.activeTab,
    });
    this.activateMain = this.activateMain.bind(this);
    this.updateRestaurant = this.updateRestaurant.bind(this);
    this.deleteRestaurant = this.deleteRestaurant.bind(this);
    document.addEventListener("tabClicked", this.activateMain);
    document.addEventListener("restaurantUpdated", this.updateRestaurant);
    document.addEventListener("restaurantDeleted", this.deleteRestaurant);
    document.addEventListener(
      "favoriteUpdated",
      (event) =>
        (this.state.favoriteRestaurants = event.detail.favoriteRestaurants),
    );
  }

  initState() {
    const savedData = localStorage.getItem("restaurantList");
    const savedFavorites = localStorage.getItem("favoriteRestaurantList");
    if (!savedData) {
      localStorage.setItem("restaurantList", JSON.stringify(RestaurantData));
    }
    if (!savedFavorites) {
      localStorage.setItem("favoriteRestaurantList", JSON.stringify([]));
    }
    return {
      isModalOpen: false,
      restaurantList: savedData ? JSON.parse(savedData) : [...RestaurantData],
      favoriteRestaurants: savedFavorites ? JSON.parse(savedFavorites) : [],
      selectedCategory: "전체",
      sortOption: "name",
      selectedRestaurant: null,
      activeTab: "all",
    };
  }

  render() {
    new Header(document.querySelector(".gnb"), {
      toggleModal: () => this.toggleModal(),
    });
    if (this.state.activeTab === "all") {
      this.showAllRestaurants();
    } else {
      this.showFavoriteRestaurants();
    }
    new Modal(document.querySelector(".modal"), {
      isModalOpen: this.state.isModalOpen,
      toggleModal: () => this.toggleModal(),
      content: this.state.selectedRestaurant
        ? restaurantInfoContent(this.state.selectedRestaurant)
        : addResturantContent(),
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

  toggleModal(restaurantData = null) {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
      restaurantList: this.state.restaurantList,
      selectedRestaurant: restaurantData,
    });
  }

  activateMain(event) {
    const { targetTabTitle } = event.detail;
    this.setState({
      activeTab: targetTabTitle,
    });
    this.tab.updateActiveTab(targetTabTitle);
  }

  filterRestaurants(selectedCategory) {
    const filtered = filterByCategory(
      JSON.parse(localStorage.getItem("restaurantList")),
      selectedCategory,
    );
    this.setState({
      restaurantList: filtered,
      selectedCategory,
    });
  }

  sortRestaurants(sortOption) {
    const sorted = sortByOption(this.state.restaurantList, sortOption);
    this.setState({
      restaurantList: sorted,
      sortOption,
    });
  }

  updateRestaurant(event) {
    const newRestaurantList = [...this.state.restaurantList];
    newRestaurantList.push(event.detail.information);
    localStorage.setItem("restaurantList", JSON.stringify(newRestaurantList));

    this.setState({
      restaurantList: newRestaurantList,
      selectedCategory: this.state.selectedCategory,
      sortOption: this.state.sortOption,
    });
  }

  deleteRestaurant(event) {
    const restaurantId = event.detail.restaurantId;
    let restaurantIndex = -1;
    this.state.restaurantList.forEach((restaurant, index) => {
      if (restaurant.id === restaurantId) {
        restaurantIndex = index;
      }
    });
    const removed = this.state.restaurantList.splice(restaurantIndex, 1);
    localStorage.setItem(
      "restaurantList",
      JSON.stringify([...this.state.restaurantList]),
    );
    this.setState({
      restaurantList: this.state.restaurantList,
      selectedCategory: this.state.selectedCategory,
      sortOption: this.state.sortOption,
      selectedRestaurant: null,
    });
  }
}
export default App;
