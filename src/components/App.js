import Header from "./Header/Header.js";
import Component from "./Component.js";
import Modal from "./Modal/Modal.js";
import { RestaurantData } from "../constants/RestaurantData.js";
import {
  addResturantContent,
  restaurantInfoContent,
} from "./Modal/getModalContent.js";
import getRestaurant from "./Restaurant/Restaurant.js";
import {
  createCategoryFilter,
  createSortingFilter,
} from "./createFilterSelect.js";
import renderRestaurants from "./renderRestaurants.js";
import filterByCategory from "./filterRestaurants.js";
import sortByOption from "./sortRestaurants.js";
import Tab from "./Tab/tab.js";
class App extends Component {
  constructor($target) {
    super($target);
    this.state = this.initState();
    this.tab = new Tab(document.querySelector(".tab-container"), {
      activeTab: this.state.activeTab,
    });
    this.activateMain = this.activateMain.bind(this);
    this.getNewRestaurant = this.getNewRestaurant.bind(this);
    this.deleteRestaurant = this.deleteRestaurant.bind(this);
    document.addEventListener("tabClicked", this.activateMain);
    document.addEventListener("restaurantUpdated", this.getNewRestaurant);
    document.addEventListener("restaurantDeleted", this.deleteRestaurant);
  }

  initState() {
    const savedData = localStorage.getItem("restaurantList");
    if (!savedData) {
      localStorage.setItem("restaurantList", JSON.stringify(RestaurantData));
    }
    return {
      isModalOpen: false,
      restaurantList: savedData ? JSON.parse(savedData) : [...RestaurantData],
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
      renderRestaurants(this.state.restaurantList, (restaurant) => {
        this.toggleModal(restaurant);
      });
      createCategoryFilter((selectedCategory) => {
        this.filterRestaurants(selectedCategory);
      }, this.state.selectedCategory);
      createSortingFilter((sortOption) => {
        this.sortRestaurants(sortOption);
      }, this.state.sortOption);
    } else {
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

  getNewRestaurant(event) {
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
