import renderList from "./components/RestaurantList";
import RestaurantService from "./domains/RestaurantService";
import { Category, Restaurant } from "./domains/types";
import MainView from "./views/MainView";
import ModalView from "./views/ModalView";

export class App {
  private restaurantService = new RestaurantService();
  private mainView = new MainView();
  private modalView = new ModalView();

  play() {
    this.modalView.addSubmitEventHandler(this.onSubmitRestaurantAddForm);
    this.mainView.addCategoryChangeEventHandler(this.onChangeCategoryFilter);
  }

  onSubmitRestaurantAddForm = (restaurantItem: Restaurant) => {
    this.restaurantService.add(restaurantItem);
    const restaurantList = this.restaurantService.sortByName();
    renderList(restaurantList);
  };

  onChangeCategoryFilter = (category: Category) => {
    const filteredRestaurantList = this.restaurantService.filter(category);
    renderList(filteredRestaurantList);
  };
}

const app = new App();
app.play();
