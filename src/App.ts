import { Restaurant, RestaurantFilter } from './types/index';
import { INITIAL_RESTAURANT_DATA } from './constants/data';
import { MODAL_ATTRIBUTE } from './constants/domAttributes';
import { $ } from './utils/domSelectors';
import { getLocalStorage, saveToLocalStorage } from './utils/localStorage';
import RestaurantFilters from './components/RestaurantFilters';
import {
  addRestaurantTabMenuEvent,
  renderRestaurantTabMenus,
} from './components/RestaurantTabMenu';
import {
  addRestaurantClickEvent,
  removeRestaurantItem,
  renderRestaurantItems,
} from './components/RestaurantListContainer';
import Modal from './components/Modal';
import RestaurantAddForm from './components/RestaurantAddForm';
import RestaurantInformation from './components/RestaurantInformation';
import { addHeaderEvent } from './events/headerEvents';
import RestaurantService from './domains/RestaurantService';
import { filterAndSort } from './domains/utils';

class App {
  private restaurantService: RestaurantService;
  private formModal: Modal = new Modal(MODAL_ATTRIBUTE.FORM, RestaurantAddForm);
  private informationModal: Modal = new Modal(
    MODAL_ATTRIBUTE.RESTAURANT_INFORMATION,
    RestaurantInformation
  );
  private currentDisplayStatus: RestaurantFilter = { category: '전체', sorting: '이름순' };
  private currentTab: string = 'all-restaurants';
  private body = $<HTMLBodyElement>('body');
  private restaurantListElement: Element;

  constructor() {
    const restaurantList = getLocalStorage() ?? INITIAL_RESTAURANT_DATA;
    this.restaurantService = new RestaurantService(restaurantList);
    this.render();
    this.renderComponents();
    this.restaurantListElement = $<HTMLButtonElement>('.restaurant-list');
    this.updateRestaurantList();
    this.addEvents();
  }

  create() {
    return `
      <main>
        ${RestaurantFilters.create()}
        ${this.formModal.create()}
        ${this.informationModal.create()}
      </main>
    `;
  }

  render() {
    this.body.insertAdjacentHTML('beforeend', this.create());
  }

  renderComponents() {
    renderRestaurantTabMenus();
    RestaurantFilters.render();
  }

  updateRestaurantList() {
    const restaurantList =
      this.currentTab === 'all-restaurants'
        ? filterAndSort(this.currentDisplayStatus, this.restaurantService.getRestaurantList())
        : filterAndSort(
            this.currentDisplayStatus,
            this.restaurantService.getFavoriteRestaurantList()
          );

    renderRestaurantItems(restaurantList);
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
      removeRestaurantItem(this.restaurantListElement, restaurantId);
    }
  };

  showRestaurantInformation = (restaurantId: number) => {
    const restaurant = this.restaurantService.getRestaurant(restaurantId);
    this.informationModal.renderContent(
      restaurant,
      this.deleteRestaurant,
      this.updateFavoriteRestaurant
    );
  };

  deleteRestaurant = (restaurantId: number) => {
    const updatedRestaurantList = this.restaurantService.delete(restaurantId);
    removeRestaurantItem(this.restaurantListElement, restaurantId);
    saveToLocalStorage(updatedRestaurantList);
  };

  addEvents() {
    addHeaderEvent(this.formModal.openModal);
    addRestaurantTabMenuEvent(this.changeRestaurantMenuTab);
    RestaurantFilters.addEvents(this.changeFilter);
    addRestaurantClickEvent(
      this.updateFavoriteRestaurant,
      this.showRestaurantInformation,
      this.informationModal.openModal
    );
    this.formModal.addEvents(this.addRestaurant);
    this.informationModal.addEvents();
  }
}

export default new App();
