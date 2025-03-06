import image from "../public/icons/favorite-icon-filled.png";
import Header from "./components/Header.js";
import RestaurantList from "./components/RestaurantList.js";
import { restaurants } from "./database/restaurants.js";
import AddRestaurantModal from "./components/modal/AddRestaurantModal.js";
import Modal from "./components/modal/Modal.js";
import Component from "./components/core/Component.js";

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
  }

  template() {
    return /*html*/ `
        ${Header()}
        <main>
          
        </main>
        <div id="modal"></div>
    `;
  }

  componentDidUpdate() {
    this.renderRestaurantList();
  }

  componentDidMount() {
    const $modal = new AddRestaurantModal(document.querySelector("#modal"), {
      updateRestaurant: this.updateRestaurant.bind(this),
    });

    document.querySelector(".gnb__button").addEventListener("click", () => {
      $modal.open();
    });

    this.renderRestaurantList();
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
