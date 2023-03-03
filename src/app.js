import Component from "./core/Component";
import Header from "./components/Header";
import Filter from "./components/Filter";
import RestaurantList from "./components/RestaurantList";
import Modal from "./components/Modal";
import RestaurantRepository from "./domain/RestaurantRepository";

const dummyData = [
  {
    name: "라식당",
    category: "한식",
    distance: 5,
    description: "라식당입니다.",
  },
  {
    name: "다식당",
    category: "일식",
    distance: 10,
    description: "다식당입니다.",
  },
  {
    name: "나식당",
    category: "아시안",
    distance: 20,
    description: "나식당입니다.",
  },
  {
    name: "가식당",
    category: "아시안",
    distance: 20,
    description: "가식당입니다.",
  },
];

export default class App extends Component {
  setup() {
    // 로컬 스토리지에서 데이터 페칭
    this.restaurantRepository = new RestaurantRepository(dummyData);
    const sortedList = RestaurantRepository.sortRestaurants("name", dummyData);
    this.state = {
      restaurantList: sortedList,
      modalOpen: false,
      sortingWay: "name",
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
    const { toggleModal, addRestaurant, setSortingWay } = this;
    const { restaurantList, sortingWay } = this.state;

    const $header = this.$target.querySelector(".gnb");
    const $restaurantFilter = this.$target.querySelector(
      ".restaurant-filter-container"
    );
    const $restaurantList = this.$target.querySelector(
      ".restaurant-list-container"
    );
    const $modal = this.$target.querySelector(".modal");

    new Header($header, { toggleModal: toggleModal.bind(this) });
    new Filter($restaurantFilter, {
      sortingWay,
      setSortingWay: setSortingWay.bind(this),
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
    const newRestaurantList = RestaurantRepository.sortRestaurants(sortingWay, [
      ...restaurantList,
      newRestaurant,
    ]);

    this.setState({
      restaurantList: newRestaurantList,
    });

    this.restaurantRepository.addRestaurant(newRestaurant);
    // 로컬에 새 음식점 추가

    this.toggleModal();
  }

  setSortingWay(sortingWay) {
    const { restaurantList } = this.state;
    const newRestaurantList = RestaurantRepository.sortRestaurants(
      sortingWay,
      restaurantList
    );

    this.setState({
      restaurantList: newRestaurantList,
      sortingWay: sortingWay,
    });
  }
}
