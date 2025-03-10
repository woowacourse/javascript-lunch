import Header from "./Header/Header.js";
import createRestaurant from "./createRestaurant.js";
import Component from "./Component.js";
import Modal from "./Modal/Modal.js";
import Restaurant from "./Restaurant/Restaurant.js";
import { RestaurantData } from "../constants/RestaurantData.js";
import getModalContent from "./Modal/getModalContent.js";
class App extends Component {
  constructor($target) {
    super($target);
    this.state = this.setUp();
    document.addEventListener("restaurantUpdated", this.addNewRestaurant);
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
      content: getModalContent("restaurant"),
    });

    createRestaurant();
  }

  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  addNewRestaurant() {
    const restaurantList = document.querySelector(".restaurant-list");
    const newRestaurant = RestaurantData[RestaurantData.length - 1];
    if (newRestaurant) {
      const restaurantItem = document.createElement("li");
      restaurantItem.classList.add("restaurant");
      new Restaurant(restaurantItem, newRestaurant);
      restaurantList.appendChild(restaurantItem);
    }
  }
}
export default App;
