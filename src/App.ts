import Header from "./view/components/Header.js";
import RestaurantContainer from "./view/components/RestaurantContainer.js";
import Modal from "./view/components/Modal";

export class App {
  constructor() {
    new Header();
    new RestaurantContainer();
    new Modal();
  }
}
