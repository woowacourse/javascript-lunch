import '@/css/index.css';
import RestaurantList from './RestaurantList/RestaurantList';
import { Category, SortCriteria } from '@/types/Restaurant';
import FilterContainer from './Basic/FilterContainer';
import RestaurantDBService from '@/domains/services/RestaurantDBService';
import restaurantListMock from '@/mock/restaurantList.mock';
import { dom } from '@/util/dom';

class AllRestaurantApp extends HTMLDivElement {
  #filterContainer: FilterContainer;
  #restaurantList: RestaurantList;
  #restaurantDBService: RestaurantDBService;

  observedAttributes = [];

  constructor() {
    super();
    this.classList.add('all-restaurant-app');
    this.innerHTML = `
    <filter-container class="restaurant-filter-container"></filter-container>
    <ul is="restaurant-list" class="restaurant-list-container restaurant-list"></ul>
    `;

    this.#filterContainer = dom.getElement<FilterContainer>(this, '.restaurant-filter-container');
    this.#restaurantList = dom.getElement<RestaurantList>(this, '.restaurant-list');

    this.#restaurantDBService = new RestaurantDBService();
    this.render();
  }

  render() {
    this.#restaurantList.paint(this.#getNewRestaurantList());
  }

  #getNewRestaurantList() {
    const { category, sortCriteria } = this.#filterContainer.get();

    const newRestaurantList = this.#getDB(category, sortCriteria);
    if (!newRestaurantList) {
      this.#setMock();
    }
    return this.#getDB(category, sortCriteria);
  }

  #setMock() {
    this.#restaurantDBService.set(restaurantListMock);
  }

  #getDB(category: Category, sortCriteria: SortCriteria) {
    return this.#restaurantDBService.getFromRestaurantList(category, sortCriteria);
  }
}

customElements.define('all-restaurant-app', AllRestaurantApp, { extends: 'div' });

export default AllRestaurantApp;
