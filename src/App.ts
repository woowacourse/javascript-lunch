import { Category, SortingCriterion, Restaurant } from './types/types';
import { INITIAL_RESTAURANT_DATA } from './constants/data';
import { saveToLocalStorage, getLocalStorage } from './utils/localStorage';
import RestaurantService from './domains/RestaurantService';
import MainView from './views/MainView';
import ModalView from './views/ModalView';

export class App {
  private restaurantService: RestaurantService;
  private mainView = new MainView();
  private modalView = new ModalView();

  constructor() {
    const restaurantList = getLocalStorage() ?? INITIAL_RESTAURANT_DATA;
    this.restaurantService = new RestaurantService(restaurantList);
    this.bindEventHandlers();
    this.mainView.renderRestaurantList(this.restaurantService.filterAndSort());
  }

  bindEventHandlers() {
    this.modalView.addSubmitEventHandler(this.onSubmitRestaurantAddForm);
    this.mainView.addCategoryChangeEventHandler(this.onChangeCategoryFilter);
    this.mainView.addSortingChangeEventHandler(this.onChangeSortingFilter);
  }

  onSubmitRestaurantAddForm = (restaurantItem: Restaurant) => {
    this.restaurantService.add(restaurantItem);
    const restaurantList = this.restaurantService.filterAndSort();
    saveToLocalStorage(restaurantList);
    this.mainView.renderRestaurantList(restaurantList);
  };

  onChangeCategoryFilter = (category: Category) => {
    this.restaurantService.setCurrentCategory(category);
    const filteredRestaurantList: Restaurant[] = this.restaurantService.filterAndSort();
    this.mainView.renderRestaurantList(filteredRestaurantList);
  };

  onChangeSortingFilter = (criterion: SortingCriterion) => {
    this.restaurantService.setCurrentSortingCriterion(criterion);
    const sortedRestaurantList: Restaurant[] = this.restaurantService.filterAndSort();
    this.mainView.renderRestaurantList(sortedRestaurantList);
  };
}

new App();
