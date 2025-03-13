import image from "../public/icons/favorite-icon-filled.png";
import Header from "./components/Header.js";
import RestaurantList from "./components/RestaurantList.js";
import { restaurants } from "./database/restaurants.js";
import AddRestaurantModal from "./components/modal/AddRestaurantModal/index.js";
import Modal from "./components/modal/Modal.js";
import Component from "./components/core/Component.js";
import { $ } from "./utils/selector.js";
import RestaurantItem from "./components/RestaurantItem.js";

class App extends Component {
  setup() {
    this.state = {
      restaurants: restaurants,
    };
  }

  updateRestaurant(newRestaurant) {
    this.setState({
      restaurants: [...this.state.restaurants, newRestaurant],
    });
    this.updateNewRestaurant(newRestaurant);
  }

  updateNewRestaurant(newRestaurant) {
    const $restaurantList = $(".restaurant-list");

    $restaurantList.insertAdjacentHTML(
      "afterbegin",
      RestaurantItem(newRestaurant)
    );
  }

  template() {
    return /*html*/ `
        <main></main>
        <div id="modal"></div>
    `;
  }

  componentDidUpdate() {}

  componentDidMount() {
    const $modal = new AddRestaurantModal($("#modal"), {
      updateRestaurant: this.updateRestaurant.bind(this),
    });

    const openModal = () => {
      if (!$modal) {
        return;
      }
      $modal.open();
    };

    const closeModalByEscapeKey = (event) => {
      if ($modal && event.key === "Escape") {
        $modal.close();
      }
    };

    window.addEventListener("keydown", closeModalByEscapeKey);

    const $header = new Header($("#app"), {
      data: {
        title: "점심 뭐 먹지",
        ariaLabel: "음식점 추가",
        dataTestId: "open-add-restaurant-modal-button",
        iconImageSource: "./icons/add-button.png",
        alt: "음식점 추가",
      },
      buttonCallback: openModal,
    });

    this.renderRestaurantList();
  }

  renderRestaurantList() {
    const $main = $("main");
    $main.insertAdjacentHTML(
      "afterbegin",
      RestaurantList(this.state.restaurants)
    );
  }
}

const app = $("#app");
new App(app);
