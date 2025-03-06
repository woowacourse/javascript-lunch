import image from "../public/icons/favorite-icon-filled.png";
import Header from "./components/Header.js";
import RestaurantList from "./components/RestaurantList.js";
import { restaurants } from "./database/restaurants.js";
import AddRestaurantModal from "./components/modal/AddRestaurantModal.js";
import Modal from "./components/modal/Modal.js";
import Component from "./components/core/Component.js";

class App extends Component {
  template() {
    return /*html*/ `
        ${Header()}
        <main>
          ${RestaurantList(restaurants)}
        </main>
        <div id="modal"></div>
    `;
  }

  componentDidMount() {
    const $modal = new AddRestaurantModal(document.querySelector("#modal"));

    document.querySelector(".gnb__button").addEventListener("click", () => {
      $modal.open();
    });
  }
}

const app = document.querySelector("#app");
new App(app);
