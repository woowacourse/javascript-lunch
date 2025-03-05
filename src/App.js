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
    console.log("open");
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
    new AddRestaurantModal(document.querySelector("#modal"), {
      isOpen: this.state.isModalOpen,
    });
  }

  componentDidMount() {
    new Header(document.querySelector("#app"), {
      openModal: this.openModal.bind(this),
    });
  }
}

const app = document.querySelector("#app");
new App(app);
