import MainView from './views/MainView';
import ModalView from './views/ModalView';
import RestaurantService from './domains/RestaurantService';
import { Category, SortingCriterion, Restaurant } from './types/types';
import {
  closeRestaurantDetailModal,
  addRestaurantRemoveButtonClickEventHandler,
} from './components/RestaurantDetailModal';
import { TAB_ID, TAB_TITLE } from './constants/constants';
import { addTabClickEventHandler, renderTabItem } from './components/TabItem';

export class App {
  private restaurantService = new RestaurantService();
  private mainView = new MainView();
  private modalView = new ModalView();
  private currentTab = TAB_ID.ALL;

  constructor() {
    this.bindEventHandlers();
    this.mainView.renderRestaurantList(this.restaurantService.filterAndSort());
    this.renderTabs();
  }

  bindEventHandlers() {
    const restaurantNames = this.restaurantService.getRestaurantNames();
    this.modalView.addSubmitEventHandler(this.onSubmitRestaurantAddForm, restaurantNames);
    this.mainView.addCategoryChangeEventHandler(this.onChangeCategoryFilter);
    this.mainView.addSortingChangeEventHandler(this.onChangeSortingFilter);
    addTabClickEventHandler(this.onChangeTab);
    addRestaurantRemoveButtonClickEventHandler(this.onClickRestaurantRemoveButton);
  }

  renderTabs() {
    renderTabItem({ tabId: TAB_ID.ALL, tabTitle: TAB_TITLE.ALL, isChecked: true });
    renderTabItem({ tabId: TAB_ID.FAVORITE, tabTitle: TAB_TITLE.FAVORITE, isChecked: false });
  }

  onSubmitRestaurantAddForm = (restaurantItem: Restaurant) => {
    this.restaurantService.add(restaurantItem);
    const restaurantList = this.getCurrentTabRestaurantList();
    this.mainView.renderRestaurantList(restaurantList);
  };

  onChangeCategoryFilter = (category: Category) => {
    this.restaurantService.setCurrentCategory(category);
    const filteredRestaurantList: Restaurant[] = this.getCurrentTabRestaurantList();

    this.mainView.renderRestaurantList(filteredRestaurantList);
  };

  onChangeSortingFilter = (criterion: SortingCriterion) => {
    this.restaurantService.setCurrentSortingCriterion(criterion);
    const sortedRestaurantList: Restaurant[] = this.getCurrentTabRestaurantList();

    this.mainView.renderRestaurantList(sortedRestaurantList);
  };

  onClickRestaurantRemoveButton = (restaurantName: string) => {
    this.restaurantService.remove(restaurantName);
    closeRestaurantDetailModal();
    this.mainView.renderRestaurantList(this.getCurrentTabRestaurantList());
  };

  onChangeTab = (tabId: string) => {
    this.currentTab = tabId;
    this.mainView.renderRestaurantList(this.getCurrentTabRestaurantList());
  };

  getCurrentTabRestaurantList() {
    if (this.currentTab === TAB_ID.FAVORITE) {
      const favoriteRestaurantList = this.restaurantService.getFavoriteRestaurantList();

      return this.restaurantService.filterAndSort(favoriteRestaurantList);
    }
    return this.restaurantService.filterAndSort();
  }
}

const app = new App();
