import renderList from "./components/RestaurantList";
import RestaurantService from "./domains/RestaurantService";
import { Restaurant } from "./domains/types";
import ModalView from "./views/ModalView";

export class App {
  private restaurantService = new RestaurantService();
  private modalView = new ModalView();

  play() {
    this.modalView.addSubmitEventHandler(this.onSubmitRestaurantAddForm);
  }

  onSubmitRestaurantAddForm = (restaurantItem: Restaurant) => {
    this.restaurantService.add(restaurantItem);
    const restaurantList = this.restaurantService.sortByName();
    renderList(restaurantList);
  };
}

const app = new App();
app.play();
