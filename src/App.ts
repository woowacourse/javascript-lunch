import { RestaurantFilter } from './types/types';
import { INITIAL_RESTAURANT_DATA } from './constants/data';
import { $ } from './utils/domSelectors';
import { getLocalStorage } from './utils/localStorage';
import Header from './components/Header';
import RestaurantFilters from './components/RestaurantFilters';
import RestaurantService from './domains/RestaurantService';
import RestaurantListContainer from './components/RestaurantListContainer';
import Modal from './components/Modal';

class App {
  private restaurantService: RestaurantService;
  private currentDisplayStatus: RestaurantFilter = { category: '전체', sorting: 'name' };
  private body = $('body') as HTMLBodyElement;

  constructor() {
    const restaurantList = getLocalStorage() ?? INITIAL_RESTAURANT_DATA;
    this.restaurantService = new RestaurantService(restaurantList);
    this.render();
    RestaurantListContainer.renderRestaurantItems(
      $('.restaurant-list') as HTMLUListElement,
      restaurantList
    );
    this.addEvents();
  }

  create() {
    return `
      ${Header.create()}
      <main>
        ${RestaurantFilters.create()}
        ${RestaurantListContainer.create()}
        ${Modal.create()}
      </main>
    `;
  }

  render() {
    this.body.insertAdjacentHTML('beforeend', this.create());
  }

  changeFilter = (filter: RestaurantFilter) => {
    this.currentDisplayStatus = { ...this.currentDisplayStatus, ...filter };
    const restaurantList = this.restaurantService.filterAndSort(this.currentDisplayStatus);
    RestaurantListContainer.renderRestaurantItems(
      $('.restaurant-list') as HTMLUListElement,
      restaurantList
    );
  };

  addEvents() {
    RestaurantFilters.addEvent(this.changeFilter);
  }
}

export default new App();
