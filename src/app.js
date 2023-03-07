import Component from "./core/Component";
import Header from "./components/Header";
import Filter from "./components/Filter";
import RestaurantList from "./components/RestaurantList";
import Modal from "./components/Modal";

import RestaurantListManager from "./domain/RestaurantListManager";
import RestaurantFilter from "./domain/RestaurantFilter";
import LocalStorage from "./util/LocalStorage";
import { CATEGORY, SORT } from "./constants";

export default class App extends Component {
  setup() {
    const localList = LocalStorage.getData("list");
    this.RestaurantListManager = new RestaurantListManager(localList);
    const sortedList = RestaurantFilter.sortRestaurants("name", localList);

    this.state = {
      restaurantList: sortedList,
      modalOpen: false,
      sortingWay: SORT.NAME,
      category: CATEGORY.ALL,
    };
  }

  template() {
    const { modalOpen } = this.state;
    return `
      <header class="gnb"></header>
      <main>
        <section class="restaurant-filter-container"></section>
        <section class="restaurant-list-container"></section>
        <div class="modal${modalOpen ? " modal--open" : ""}"></div>
      </main>
    `;
  }

  mounted() {
    const { toggleModal, addRestaurant, onChangeSortingWay, onChangeCategory } = this;
    const { restaurantList, sortingWay, category } = this.state;

    const $header = this.$target.querySelector(".gnb");
    const $restaurantFilter = this.$target.querySelector(".restaurant-filter-container");
    const $restaurantList = this.$target.querySelector(".restaurant-list-container");
    const $modal = this.$target.querySelector(".modal");

    new Header($header, { toggleModal: toggleModal.bind(this) });
    new Filter($restaurantFilter, {
      sortingWay,
      category,
      onChangeSortingWay: onChangeSortingWay.bind(this),
      onChangeCategory: onChangeCategory.bind(this),
    });
    new RestaurantList($restaurantList, { restaurantList });
    new Modal($modal, {
      toggleModal: toggleModal.bind(this),
      addRestaurant: addRestaurant.bind(this),
    });
  }

  toggleModal() {
    this.setState({ modalOpen: !this.state.modalOpen });
  }

  addRestaurant(newRestaurant) {
    const { sortingWay, category } = this.state;

    this.RestaurantListManager.addRestaurant(newRestaurant);
    const addedList = this.RestaurantListManager.getRestaurantList();

    const sortedList = RestaurantFilter.sortRestaurants(sortingWay, addedList);
    const updatedList = RestaurantFilter.categorizeRestaurants(category, sortedList);

    LocalStorage.setData("list", addedList);
    this.setState({ restaurantList: updatedList });

    this.toggleModal();
  }

  onChangeSortingWay(event) {
    const sortingWay = event.target.value;
    const { restaurantList } = this.state;

    const updatedRestaurantList = RestaurantFilter.sortRestaurants(sortingWay, restaurantList);

    this.setState({ restaurantList: updatedRestaurantList, sortingWay: sortingWay });
  }

  onChangeCategory(event) {
    const category = event.target.value;
    const { sortingWay } = this.state;

    const restaurantList = this.RestaurantListManager.getRestaurantList();
    const filteredRestaurantList = RestaurantFilter.categorizeRestaurants(category, restaurantList);
    const updatedRestaurantList = RestaurantFilter.sortRestaurants(sortingWay, filteredRestaurantList);

    this.setState({ restaurantList: updatedRestaurantList, category: category });
  }
}
