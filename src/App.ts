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
import { addHeaderEvent } from './events/headerEvents';
import RestaurantService from './domains/RestaurantService';

class App {
  private restaurantService: RestaurantService;
  private restaurantListContainer: RestaurantListContainer;
  private formModal: Modal = new Modal(MODAL_ATTRIBUTE.FORM, RestaurantForm);
  private informationModal: Modal = new Modal(MODAL_ATTRIBUTE.RESTAURANT_INFORMATION, RestaurantInformation);
  private currentDisplayStatus: RestaurantFilter = { category: '전체', sorting: '이름순' };
  private currentTab: string = 'all-restaurants';

  constructor() {
    const restaurantList = getLocalStorage() ?? INITIAL_RESTAURANT_DATA;
    this.restaurantService = new RestaurantService(restaurantList);
    this.restaurantListContainer = new RestaurantListContainer(this.restaurantService);
    this.renderComponents();
    this.restaurantListContainer.updateRestaurantList(this.currentTab, this.currentDisplayStatus);
    this.addEvents();
  }

  renderComponents() {
    RestaurantTabMenu.render();
    RestaurantFilters.render();
    this.formModal.render();
    this.informationModal.render();
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
      this.restaurantListContainer.updateRestaurantList(this.currentTab, this.currentDisplayStatus);
    }
  };

  changeRestaurantMenuTab = (tab: string) => {
    this.currentTab = tab;
    this.restaurantListContainer.updateRestaurantList(this.currentTab, this.currentDisplayStatus);
  };

  changeFilter = (filter: RestaurantFilter) => {
    this.currentDisplayStatus = { ...this.currentDisplayStatus, ...filter };
    this.restaurantListContainer.updateRestaurantList(this.currentTab, this.currentDisplayStatus);
  };

  updateFavoriteRestaurant = (restaurantId: number) => {
    const updatedRestaurantList = this.restaurantService.updateFavorite(restaurantId);
    saveToLocalStorage(updatedRestaurantList);

    if (this.currentTab === 'favorite-restaurants') {
      this.restaurantListContainer.updateRestaurantList(this.currentTab, this.currentDisplayStatus);
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
    this.restaurantListContainer.updateRestaurantList(this.currentTab, this.currentDisplayStatus);
  };

  addEvents() {
    addHeaderEvent(this.formModal.open);
    RestaurantTabMenu.addEvent(this.changeRestaurantMenuTab);
    RestaurantFilters.addEvents(this.changeFilter);
    this.restaurantListContainer.addEvent(
      this.updateFavoriteRestaurant,
      this.informationModal.open,
      this.showRestaurantInformation
    );
    this.formModal.addEvent();
    RestaurantForm.addEvents(this.formModal.close, this.addRestaurant);
    this.informationModal.addEvent();
    RestaurantInformation.addButtonEvents(this.informationModal.close, this.deleteRestaurant);
  }
}

export default new App();
