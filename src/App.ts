import renderList from "./components/RestaurantList";
import RestaurantService from "./domains/RestaurantService";
import { Category, Criterion, Restaurant } from "./domains/types";
import MainView from "./views/MainView";
import ModalView from "./views/ModalView";

export class App {
  private restaurantService = new RestaurantService();
  private mainView = new MainView();
  private modalView = new ModalView();

  constructor() {
    renderList(this.restaurantService.filterAndSort());
  }

  play() {
    this.modalView.addSubmitEventHandler(this.onSubmitRestaurantAddForm);
    this.mainView.addCategoryChangeEventHandler(this.onChangeCategoryFilter);
    this.mainView.addSortingChangeEventHandler(this.onChangeSortingFilter);
  }

  onSubmitRestaurantAddForm = (restaurantItem: Restaurant) => {
    this.restaurantService.add(restaurantItem);
    const restaurantList = this.restaurantService.filterAndSort();
    renderList(restaurantList);
  };

  onChangeCategoryFilter = (category: Category) => {
    this.restaurantService.setCurrentCategory(category);
    const filteredRestaurantList: Restaurant[] =
      this.restaurantService.filterAndSort();
    renderList(filteredRestaurantList);
  };

  onChangeSortingFilter = (criterion: Criterion) => {
    this.restaurantService.setCurrentSortingCriterion(criterion);
    const sortedRestaurantList: Restaurant[] =
      this.restaurantService.filterAndSort();
    renderList(sortedRestaurantList);
  };
}

const app = new App();
app.play();
