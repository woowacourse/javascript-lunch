import image from "../public/icons/favorite-icon-filled.png";
import Header from "./components/Header.js";
import RestaurantList from "./components/RestaurantList.js";
import { restaurants } from "./database/restaurants.js";
import AddRestaurantModal from "./components/modal/AddRestaurantModal/index.js";
import Modal from "./components/modal/Modal.js";
import Component from "./components/core/Component.js";

class App extends Component {
  setup() {
    this.state = {
      restaurants: restaurants,
    };
    this.watchState("restaurants", () => this.renderRestaurantList());
  }

  updateRestaurant(newRestaurant) {
    this.setState({
      restaurants: [...this.state.restaurants, newRestaurant],
    });
  }

  template() {
    return /*html*/ `
        ${Header()}
        <main></main>
        <div id="modal"></div>
    `;
  }

  componentDidMount() {
    this.renderModal();
    this.renderRestaurantList();
  }

  renderModal() {
    const $modal = new AddRestaurantModal(document.querySelector("#modal"), {
      submit: this.updateRestaurant.bind(this),
    });
  }

  renderRestaurantList() {
    const $main = document.querySelector("main");

    $main.replaceChildren();
    $main.insertAdjacentHTML(
      "afterbegin",
      RestaurantList(this.state.restaurants)
    );
  }
}

const app = document.querySelector("#app");
new App(app);
