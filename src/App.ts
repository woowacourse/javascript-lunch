import "./types/restaurant";
import Component from "./core/Component";
import Header from "./components/Header";
import Filter from "./components/Filter";
import RestaurantList from "./components/RestaurantList";
import Modal from "./components/Modal";

import RestaurantRepository from "./domain/RestaurantRepository";
import RestaurantFilter from "./domain/RestaurantFilter";
import store from "./util/store";

export default class App extends Component {
  restaurantRepository: any;

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

    if ($header && $restaurantFilter && $restaurantList && $modal) {
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
  }

  toggleModal() {
    this.setState({ modalOpen: !this.state.modalOpen });
  }

  addRestaurant(newRestaurant: RestaurantInfo) {
    const { restaurantList, category, sortingWay } = this.state;
    const updatedRestaurantList = RestaurantFilter.sortRestaurants(
      sortingWay,
      RestaurantFilter.categorizeRestaurants(category, [...restaurantList, newRestaurant])
    );

    this.restaurantRepository.addRestaurant(newRestaurant);
    this.setState({ restaurantList: updatedRestaurantList });
    store.setLocalStorage(updatedRestaurantList);

    this.toggleModal();
  }

  setSortingWay(event: Event) {
    const target = event.target as HTMLSelectElement;
    const sortingWay = target.value;
    const { restaurantList } = this.state;

    if (sortingWay === "name" || sortingWay === "distance") {
      const updatedRestaurantList = RestaurantFilter.sortRestaurants(sortingWay, restaurantList);
      this.setState({ restaurantList: updatedRestaurantList, sortingWay: sortingWay });
      console.log(sortingWay);
    }
  }

  setCategory(event: Event) {
    const target = event.target as HTMLSelectElement;
    const category = target.value;
    const { sortingWay } = this.state;

    const restaurantList = this.restaurantRepository.getRestaurantList();

    if (
      category === "전체" ||
      category === "한식" ||
      category === "중식" ||
      category === "일식" ||
      category === "아시안" ||
      category === "양식" ||
      category === "기타"
    ) {
      const filteredRestaurantList = RestaurantFilter.categorizeRestaurants(category, restaurantList);
      const updatedRestaurantList = RestaurantFilter.sortRestaurants(sortingWay, filteredRestaurantList);

      this.setState({ restaurantList: updatedRestaurantList, category: category });
    }
  }
}
