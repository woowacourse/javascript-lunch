import Header from "./Header/Header.js";
import createRestaurant from "./createRestaurant.js";
import Component from "./Component.js";
import Modal from "./Modal/Modal.js";
class App extends Component {
  constructor($target) {
    super($target);
    this.state = this.setUp();
    document.addEventListener("restaurantUpdated", () => this.render());
  }

  setUp() {
    return { isModalOpen: false };
  }

  render() {
    new Header(document.querySelector(".gnb"), {
      toggleModal: () => this.toggleModal(),
    });

    new Modal(document.querySelector(".modal"), {
      isModalOpen: this.state.isModalOpen,
      toggleModal: () => this.toggleModal(),
    });

    document.querySelector(".restaurant-list").innerHTML = "";
    createRestaurant();
  }

  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }
}
export default App;
