import MainView from './views/MainView';
import ModalView from './views/ModalView';
import RestaurantService from './domains/RestaurantService';
import { Category, SortingCriterion, Restaurant } from './types/types';
import {
  closeRestaurantDetailModal,
  addRestaurantRemoveButtonClickEventHandler,
} from './components/RestaurantDetailModal';

export class App {
  private restaurantService = new RestaurantService();
  private mainView = new MainView();
  private modalView = new ModalView();

  constructor() {
    this.bindEventHandlers();
    this.mainView.renderRestaurantList(this.restaurantService.filterAndSort());
  }

  bindEventHandlers() {
    this.modalView.addSubmitEventHandler(this.onSubmitRestaurantAddForm);
    this.mainView.addCategoryChangeEventHandler(this.onChangeCategoryFilter);
    this.mainView.addSortingChangeEventHandler(this.onChangeSortingFilter);
    addRestaurantRemoveButtonClickEventHandler(this.onClickRestaurantRemoveButton);
  }

  onSubmitRestaurantAddForm = (restaurantItem: Restaurant) => {
    this.restaurantService.add(restaurantItem);
    const restaurantList = this.restaurantService.filterAndSort();
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

  onClickRestaurantRemoveButton = (restaurantName: string) => {
    this.restaurantService.remove(restaurantName);
    closeRestaurantDetailModal();
    this.mainView.renderRestaurantList(this.restaurantService.filterAndSort());
  };
}

const app = new App();
