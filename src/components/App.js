import Header from "./Header/Header.js";
import Component from "./Component.js";
import Modal from "./Modal/Modal.js";
import {
  RestaurantData,
  mappedRestaurantData,
} from "../constants/RestaurantData.js";
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
class App extends Component {
  constructor($target) {
    super($target);
    this.state = this.initState();
    this.addNewRestaurant = this.addNewRestaurant.bind(this);
    document.addEventListener("restaurantUpdated", this.addNewRestaurant);
  }

  initState() {
    localStorage.setItem("restaurantList", JSON.stringify(RestaurantData));

    return {
      isModalOpen: false,
      restaurantList: [...RestaurantData],
      selectedCategory: "전체",
      sortOption: "name",
      selectedRestaurant: null,
    };
  }

  render() {
    new Header(document.querySelector(".gnb"), {
      toggleModal: () => this.toggleModal(),
    });

    renderRestaurants(this.state.restaurantList, (restaurant) => {
      this.toggleModal(restaurant);
    });
    createCategoryFilter((selectedCategory) => {
      this.filterRestaurants(selectedCategory);
    }, this.state.selectedCategory);
    createSortingFilter((sortOption) => {
      this.sortRestaurants(sortOption);
    }, this.state.sortOption);
    new Modal(document.querySelector(".modal"), {
      isModalOpen: this.state.isModalOpen,
      toggleModal: () => this.toggleModal(),
      content: this.state.selectedRestaurant
        ? restaurantInfoContent(this.state.selectedRestaurant) // ✅ 선택된 레스토랑 정보
        : addResturantContent(),
    });
  }

  toggleModal(restaurantData = null) {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
      restaurantList: this.state.restaurantList,
      selectedRestaurant: restaurantData,
    });
  }

  filterRestaurants(selectedCategory) {
    const filtered = filterByCategory(RestaurantData, selectedCategory);
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

  addNewRestaurant() {
    const newRestaurantList = JSON.parse(
      localStorage.getItem("restaurantList"),
    );
    this.setState({
      restaurantList: newRestaurantList,
      selectedCategory: this.state.selectedCategory,
      sortOption: this.state.sortOption,
    });
  }
}
export default App;
