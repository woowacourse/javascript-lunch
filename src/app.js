import Component from "./core/Component";
import Header from "./components/Header";
import Filter from "./components/Filter";
import RestaurantList from "./components/RestaurantList";
import Modal from "./components/Modal";

export default class App extends Component {
  setup() {
    this.state = {
      restaurantList: [
        {
          name: "가식당",
          category: "한식",
          distance: 5,
          description: "가식당입니다.",
        },
        {
          name: "나식당",
          category: "일식",
          distance: 10,
          description: "나식당입니다.",
        },
        {
          name: "다식당",
          category: "아시안",
          distance: 20,
          description: "다식당입니다.",
        },
      ],
      modalOpen: false,
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
    const { toggleModal, addRestaurant } = this;
    const { restaurantList } = this.state;

    const $header = this.$target.querySelector(".gnb");
    const $restaurantFilter = this.$target.querySelector(
      ".restaurant-filter-container"
    );
    const $restaurantList = this.$target.querySelector(
      ".restaurant-list-container"
    );
    const $modal = this.$target.querySelector(".modal");

    new Header($header, { toggleModal: toggleModal.bind(this) });
    new Filter($restaurantFilter);
    new RestaurantList($restaurantList, { restaurantList });
    new Modal($modal, {
      toggleModal: toggleModal.bind(this),
      addRestaurant: addRestaurant.bind(this),
    });
  }

  toggleModal() {
    this.setState({ modalOpen: !this.state.modalOpen });
  }

  addRestaurant(restaurantInfo) {
    const { restaurantList } = this.state;
    const newRestaurant = restaurantInfo;

    this.setState({ restaurantList: [...restaurantList, newRestaurant] });
    this.toggleModal();
  }
}
