import { Restaurant, RestaurantFilter } from './types/index';
import { INITIAL_RESTAURANT_DATA } from './constants/data';
import { MODAL_ATTRIBUTE } from './constants/domAttributes';
import { getLocalStorage, saveToLocalStorage } from './utils/localStorage';
import RestaurantTabMenu from './components/RestaurantTabMenu';
import RestaurantFilters from './components/RestaurantFilters';
import RestaurantListContainer from './components/RestaurantListContainer';
import Modal from './components/Modal';
import RestaurantForm from './components/RestaurantForm';
import RestaurantInformation from './components/RestaurantInformation';
import { filterAndSort } from './domains/utils';
import { addHeaderEvent } from './events/headerEvents';
import RestaurantService from './domains/RestaurantService';

class App {
  private restaurantService: RestaurantService;
  private formModal: Modal = new Modal(MODAL_ATTRIBUTE.FORM, RestaurantForm);
  private informationModal: Modal = new Modal(MODAL_ATTRIBUTE.RESTAURANT_INFORMATION, RestaurantInformation);
  private currentDisplayStatus: RestaurantFilter = { category: '전체', sorting: '이름순' };
  private currentTab: string = 'all-restaurants';

  constructor() {
    const restaurantList = getLocalStorage() ?? INITIAL_RESTAURANT_DATA;
    this.restaurantService = new RestaurantService(restaurantList);
    this.renderComponents();
    this.updateRestaurantList();
    this.addEvents();
  }

  renderComponents() {
    RestaurantTabMenu.render();
    RestaurantFilters.render();
    this.formModal.render();
    this.informationModal.render();
  }

  updateRestaurantList() {
    const restaurantList =
      this.currentTab === 'all-restaurants'
        ? filterAndSort(this.currentDisplayStatus, this.restaurantService.getRestaurantList())
        : filterAndSort(this.currentDisplayStatus, this.restaurantService.getFavoriteRestaurantList());

    RestaurantListContainer.renderRestaurantItems(restaurantList);
  }

  addRestaurant = (restaurantItem: Restaurant) => {
    this.restaurantService.add(restaurantItem);
    const restaurantList = this.restaurantService.getRestaurantList();
    saveToLocalStorage(restaurantList);

    if (
      (restaurantItem.category === this.currentDisplayStatus.category ||
        this.currentDisplayStatus.category === '전체') &&
      this.currentTab === 'all-restaurants'
    ) {
      this.updateRestaurantList();
    }
  };

  changeRestaurantMenuTab = (tab: string) => {
    this.currentTab = tab;
    this.updateRestaurantList();
  };

  changeFilter = (filter: RestaurantFilter) => {
    this.currentDisplayStatus = { ...this.currentDisplayStatus, ...filter };
    this.updateRestaurantList();
  };

  updateFavoriteRestaurant = (restaurantId: number) => {
    const updatedRestaurantList = this.restaurantService.updateFavorite(restaurantId);
    saveToLocalStorage(updatedRestaurantList);

    if (this.currentTab === 'favorite-restaurants') {
      RestaurantListContainer.removeRestaurantItem(restaurantId);
    }
  };

  showRestaurantInformation = (restaurantId: number) => {
    const restaurant = this.restaurantService.getRestaurant(restaurantId);
    RestaurantInformation.renderContent(restaurant);
    RestaurantInformation.addContentEvent(this.updateFavoriteRestaurant);
  };

  deleteRestaurant = (restaurantId: number) => {
    const updatedRestaurantList = this.restaurantService.delete(restaurantId);
    saveToLocalStorage(updatedRestaurantList);
    RestaurantListContainer.removeRestaurantItem(restaurantId);
  };

  addEvents() {
    addHeaderEvent(this.formModal.model);
    RestaurantTabMenu.addEvent(this.changeRestaurantMenuTab);
    RestaurantFilters.addEvents(this.changeFilter);
    RestaurantListContainer.addEvent(
      this.updateFavoriteRestaurant,
      this.informationModal.model,
      this.showRestaurantInformation
    );
    this.formModal.addEvent();
    RestaurantForm.addEvents(this.formModal.close, this.addRestaurant);
    this.informationModal.addEvent();
    RestaurantInformation.addButtonEvents(this.informationModal.close, this.deleteRestaurant);
  }
}

export default new App();
