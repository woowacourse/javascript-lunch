import { Restaurant, RestaurantFilter } from './types/types';
import { INITIAL_RESTAURANT_DATA } from './constants/data';
import { MODAL_ATTRIBUTE } from './constants/domAttributes';
import { $ } from './utils/domSelectors';
import { getLocalStorage, saveToLocalStorage } from './utils/localStorage';
import Header from './components/Header';
import RestaurantFilters from './components/RestaurantFilters';
import RestaurantListContainer from './components/RestaurantListContainer';
import Modal from './components/Modal';
import RestaurantAddForm from './components/RestaurantAddForm';
import RestaurantTabMenu from './components/RestaurantTabMenu';
import RestaurantInformation from './components/RestaurantInformation';
import RestaurantService from './domains/RestaurantService';

class App {
  private restaurantService: RestaurantService;
  private formModal: Modal = new Modal(MODAL_ATTRIBUTE.FORM, RestaurantAddForm);
  private informationModal: Modal = new Modal(
    MODAL_ATTRIBUTE.RESTAURANT_INFORMATION,
    RestaurantInformation
  );
  private currentDisplayStatus: RestaurantFilter = { category: '전체', sorting: '이름순' };
  private currentTab: string = 'all-restaurants';
  private body = $('body') as HTMLBodyElement;
  private restaurantListElement: Element;

  constructor() {
    const restaurantList = getLocalStorage() ?? INITIAL_RESTAURANT_DATA;
    this.restaurantService = new RestaurantService(restaurantList);
    this.render();
    this.restaurantListElement = $('.restaurant-list') as HTMLButtonElement;
    this.updateRestaurantList();
    this.addEvents();
  }

  create() {
    return `
      ${Header.create()}
      <main>
        ${RestaurantTabMenu.create()}
        ${RestaurantFilters.create()}
        ${RestaurantListContainer.create()}
        ${this.formModal.create()}
        ${this.informationModal.create()}
      </main>
    `;
  }

  render() {
    this.body.insertAdjacentHTML('beforeend', this.create());
  }

  changeFilter = (filter: RestaurantFilter) => {
    this.currentDisplayStatus = { ...this.currentDisplayStatus, ...filter };
    this.updateRestaurantList();
  };

  addRestaurant = (restaurantItem: Restaurant) => {
    this.restaurantService.add(restaurantItem);
    const restaurantList = this.restaurantService.filterAndSort(this.currentDisplayStatus);
    saveToLocalStorage(restaurantList);

    if (
      restaurantItem.category === this.currentDisplayStatus.category ||
      this.currentDisplayStatus.category === '전체'
    ) {
      this.updateRestaurantList();
    }
  };

  updateFavoriteRestaurant = (restaurantId: number) => {
    const updatedRestaurantList = this.restaurantService.updateFavorite(restaurantId);
    saveToLocalStorage(updatedRestaurantList);

    if (($('.tab-button--active') as HTMLButtonElement).id === 'favorite-restaurants') {
      RestaurantListContainer.removeRestaurantItem(this.restaurantListElement, restaurantId);
    }
  };

  changeRestaurantMenuTab = (tab: string) => {
    this.currentTab = tab;
    this.updateRestaurantList();
  };

  updateRestaurantList() {
    const restaurantList =
      this.currentTab === 'all-restaurants'
        ? this.restaurantService.filterAndSort(this.currentDisplayStatus)
        : this.restaurantService.filterAndSort(
            this.currentDisplayStatus,
            this.restaurantService.getFavoriteRestaurantList()
          );

    RestaurantListContainer.renderRestaurantItems(this.restaurantListElement, restaurantList);
  }

  showRestaurantInformation = (restaurantId: number) => {
    const restaurant = this.restaurantService.getRestaurant(restaurantId);
    this.informationModal.renderContent(restaurant, this.deleteRestaurant);
  };

  deleteRestaurant = (restaurantId: number) => {
    const updatedRestaurantList = this.restaurantService.delete(restaurantId);
    RestaurantListContainer.removeRestaurantItem(this.restaurantListElement, restaurantId);
    saveToLocalStorage(updatedRestaurantList);
  };

  addEvents() {
    Header.addEvent(this.formModal.openModal);
    RestaurantTabMenu.addEvent(this.changeRestaurantMenuTab);
    RestaurantFilters.addEvent(this.changeFilter);
    RestaurantListContainer.addEvent(
      this.updateFavoriteRestaurant,
      this.showRestaurantInformation,
      this.informationModal.openModal
    );
    this.formModal.addEvents(this.addRestaurant);
    this.informationModal.addEvents();
  }
}

export default new App();
