import image from "../public/icons/favorite-icon-filled.png";
import Header from "./components/Header.js";
import RestaurantList from "./components/RestaurantList.js";
import { restaurants } from "./database/restaurants.js";
import AddRestaurantModal from "./components/modal/AddRestaurantModal/index.js";
import Modal from "./components/modal/Modal.js";
import Component from "./components/core/Component.js";
import { $ } from "./utils/selector.js";
import RestaurantItem from "./components/RestaurantItem.js";

import {
  setItemToLocalStorage,
  getItemFromLocalStorage,
} from "./database/localStorage.js";
import RestaurantInfoModal from "./components/modal/RestaurantInfoModal/index.js";

class App extends Component {
  setup() {
    this.state = {
      restaurants: this.props.getItemFromLocalStorage(this.props.KEY),
    };
  }

  updateRestaurant(newRestaurant) {
    const newRestaurantList = [newRestaurant, ...this.state.restaurants];
    this.props.setItemToLocalStorage(this.props.KEY, newRestaurantList);

    this.setState({
      restaurants: newRestaurantList,
    });

    this.updateNewRestaurant(newRestaurant);
  }

  updateNewRestaurant(newRestaurant) {
    const $restaurantList = $(document, ".restaurant-list");

    $restaurantList.insertAdjacentHTML(
      "afterbegin",
      RestaurantItem(newRestaurant)
    );
  }

  deleteRestaurant(targetRestaurant) {
    const newRestaurantList = [...this.state.restaurants].filter(
      ({ name }) => name !== targetRestaurant.name
    );
    this.props.setItemToLocalStorage(this.props.KEY, newRestaurantList);

    this.setState({
      restaurants: newRestaurantList,
    });

    this.renderDeleteRestaurant(targetRestaurant);
  }

  renderDeleteRestaurant(targetRestaurant) {
    const { name } = targetRestaurant;
    const $targetRestaurant = $(document, `#${name}`);
    $targetRestaurant.remove();
  }

  template() {
    return /*html*/ `
        <main></main>
        <div id="modal"></div>
    `;
  }

  componentDidUpdate() {}

  componentDidMount() {
    const $modal = new AddRestaurantModal($(document, "#modal"), {
      updateRestaurant: this.updateRestaurant.bind(this),
    });

    const openModal = () => {
      if (!$modal) {
        return;
      }
      $modal.open();
    };

    const $header = new Header($(document, "#app"), {
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
    const $main = $(document, "main");
    $main.insertAdjacentHTML(
      "afterbegin",
      RestaurantList(this.state.restaurants)
    );

    $(document, "#restaurant-list").addEventListener("click", (event) => {
      const restaurantItem = event.target.closest("li");
      const restaurantList = this.props.getItemFromLocalStorage(this.props.KEY);

      const restaurant = restaurantList.find(
        ({ name }) => name === restaurantItem.id
      );

      const restaurantInfoModal = new RestaurantInfoModal(
        $(document, "#modal"),
        { deleteRestaurant: this.deleteRestaurant.bind(this) }
      );
      restaurantInfoModal.setState({ data: restaurant });
      restaurantInfoModal.open();
    });
  }
}

const KEY = "restaurantList";

const initialList = getItemFromLocalStorage(KEY) ?? restaurants;
setItemToLocalStorage(KEY, initialList);

const app = $(document, "#app");
new App(app, { setItemToLocalStorage, getItemFromLocalStorage, KEY });
