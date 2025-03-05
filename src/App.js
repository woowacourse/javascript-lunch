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
      isModalOpen: false,
    };
  }

  openModal() {
    this.setState({
      isModalOpen: true,
    });
  }

  closeModal() {
    this.setState({
      isModalOpen: false,
    });
  }

  template() {
    return /*html*/ `
        <main>
          ${RestaurantList(restaurants)}
        </main>
        <div id="modal"></div>
    `;
  }

  componentDidUpdate() {
    if (this.state.isModalOpen) {
      new AddRestaurantModal(document.querySelector("#modal"), {
        isOpen: this.state.isModalOpen,
        closeModal: this.closeModal.bind(this),
      });
      return;
    }
    const $modal = document.querySelector("#modal");
    if ($modal) {
      $modal.replaceChildren();
    }
  }

  componentDidMount() {
    new Header(document.querySelector("#app"), {
      openModal: this.openModal.bind(this),
    });
  }
}

const app = document.querySelector("#app");
new App(app);
