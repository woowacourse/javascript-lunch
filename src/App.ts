import MainView from './views/MainView';
import ModalView from './views/ModalView';
import RestaurantService from './domains/RestaurantService';
import { Category, SortingCriterion, Restaurant } from './types/types';
import {
  closeRestaurantDetailModal,
  addRestaurantRemoveButtonClickEventHandler,
  openRestaurantDetailModal,
  renderRestaurantDetailModal,
  addRestaurantDetailModalBackdropClickEventHandler,
  addRestaurantDetailModalCloseButtonClickEventHandler,
} from './components/RestaurantDetailModal';
import { TAB_ID } from './constants/constants';
import { addTabClickEventHandler, renderTabItemAll } from './components/TabItem';
import {
  addFavoriteButtonClickEventHandler,
  addRestaurantListClickEventHandler,
  renderRestaurantList,
} from './components/RestaurantList';

export class App {
  private restaurantService = new RestaurantService();
  private mainView = new MainView();
  private modalView = new ModalView();
  private currentTab = TAB_ID.ALL;

  constructor() {
    renderTabItemAll();
    renderRestaurantList(this.restaurantService.filterAndSort());

    this.bindEventHandlers();
  }

  bindEventHandlers() {
    const restaurantNames = this.restaurantService.getRestaurantNames();

    this.modalView.addSubmitEventHandler(this.onSubmitRestaurantAddForm, restaurantNames);
    this.mainView.addCategoryChangeEventHandler(this.onChangeCategoryFilter);
    this.mainView.addSortingChangeEventHandler(this.onChangeSortingFilter);
    addTabClickEventHandler(this.onChangeTab);
    addRestaurantListClickEventHandler(this.onClickRestaurantList);
    addFavoriteButtonClickEventHandler(this.onClickFavoriteButton);
    addRestaurantDetailModalCloseButtonClickEventHandler();
    addRestaurantDetailModalBackdropClickEventHandler();
    addRestaurantRemoveButtonClickEventHandler(this.onClickRestaurantRemoveButton);
  }

  onSubmitRestaurantAddForm = (restaurantItem: Restaurant) => {
    this.restaurantService.add(restaurantItem);
    const restaurantList = this.getCurrentTabRestaurantList();
    renderRestaurantList(restaurantList);
  };

  onChangeCategoryFilter = (category: Category) => {
    this.restaurantService.setCurrentCategory(category);
    const filteredRestaurantList: Restaurant[] = this.getCurrentTabRestaurantList();
    renderRestaurantList(filteredRestaurantList);
  };

  onChangeSortingFilter = (criterion: SortingCriterion) => {
    this.restaurantService.setCurrentSortingCriterion(criterion);
    const sortedRestaurantList: Restaurant[] = this.getCurrentTabRestaurantList();
    renderRestaurantList(sortedRestaurantList);
  };

  onClickRestaurantList = (restaurant: Restaurant) => {
    renderRestaurantDetailModal(restaurant);
    openRestaurantDetailModal();
  };

  onClickFavoriteButton = () => {
    renderRestaurantList(this.getCurrentTabRestaurantList());
  };

  onClickRestaurantRemoveButton = (restaurantName: string) => {
    this.restaurantService.remove(restaurantName);
    closeRestaurantDetailModal();
    renderRestaurantList(this.getCurrentTabRestaurantList());
  };

  onChangeTab = (tabId: string) => {
    this.currentTab = tabId;
    renderRestaurantList(this.getCurrentTabRestaurantList());
  };

  getCurrentTabRestaurantList() {
    if (this.currentTab === TAB_ID.FAVORITE) {
      const favoriteRestaurantList = this.restaurantService.getFavoriteRestaurantList();

      return this.restaurantService.filterAndSort(favoriteRestaurantList);
    }
    return this.restaurantService.filterAndSort();
  }
}

try {
  const app = new App();
} catch (error) {
  if (error instanceof Error) console.log(error.message);
}
