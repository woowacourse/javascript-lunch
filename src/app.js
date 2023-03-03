import Component from "./core/Component";
import Header from "./components/Header";
import Filter from "./components/Filter";
import RestaurantList from "./components/RestaurantList";
import Modal from "./components/Modal";

import RestaurantRepository from "./domain/RestaurantRepository";
import RestaurantFilter from "./domain/RestaurantFilter";
import store from "./util/store";

export default class App extends Component {
  setup() {
    const localList = store.getLocalStorage();
    this.restaurantRepository = new RestaurantRepository(localList);
    const sortedList = RestaurantFilter.sortRestaurants("name", localList);

    this.state = {
      restaurantList: sortedList,
      modalOpen: false,
      sortingWay: "name",
      category: "전체",
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
    const { toggleModal, addRestaurant, setSortingWay, setCategory } = this;
    const { restaurantList, sortingWay, category } = this.state;

    const $header = this.$target.querySelector(".gnb");
    const $restaurantFilter = this.$target.querySelector(".restaurant-filter-container");
    const $restaurantList = this.$target.querySelector(".restaurant-list-container");
    const $modal = this.$target.querySelector(".modal");

    new Header($header, { toggleModal: toggleModal.bind(this) });
    new Filter($restaurantFilter, {
      sortingWay,
      category,
      setSortingWay: setSortingWay.bind(this),
      setCategory: setCategory.bind(this),
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
    const { restaurantList, sortingWay } = this.state;
    const updatedRestaurantList = RestaurantFilter.sortRestaurants(sortingWay, [...restaurantList, newRestaurant]);

    this.restaurantRepository.addRestaurant(newRestaurant);
    this.setState({ restaurantList: updatedRestaurantList });
    store.setLocalStorage(updatedRestaurantList);

    this.toggleModal();
  }

  setSortingWay(event) {
    const sortingWay = event.target.value;
    const { restaurantList } = this.state;

    const updatedRestaurantList = RestaurantFilter.sortRestaurants(sortingWay, restaurantList);

    this.setState({ restaurantList: updatedRestaurantList, sortingWay: sortingWay });
  }

  setCategory(event) {
    const category = event.target.value;
    const { sortingWay } = this.state;

    const restaurantList = this.restaurantRepository.getRestaurantList();
    const filteredRestaurantList = RestaurantFilter.categorizeRestaurants(category, restaurantList);
    const updatedRestaurantList = RestaurantFilter.sortRestaurants(sortingWay, filteredRestaurantList);

    this.setState({ restaurantList: updatedRestaurantList, category: category });
  }
}
