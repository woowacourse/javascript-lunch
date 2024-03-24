import '@/css/index.css';
import RestaurantList from './RestaurantList/RestaurantList';
import { Category, CategoryOrAll, SortCriteria } from '@/types/Restaurant';
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
    this.classList.add('restaurant-app');
    this.innerHTML = `
    <div is="filter-container" class="restaurant-filter-container"></div>
    <ul is="restaurant-list" class="restaurant-list-container restaurant-list"></ul>
    `;

    this.#filterContainer = dom.getElement<FilterContainer>(this, '.restaurant-filter-container');
    this.#filterContainer.addEventListener('change', this.#onChangeFilterContainer.bind(this));
    this.#restaurantList = dom.getElement<RestaurantList>(this, '.restaurant-list');

    this.#restaurantDBService = new RestaurantDBService();
    this.render();
  }

  render() {
    this.#restaurantList.paint(this.#getNewRestaurantList());
  }

  #getNewRestaurantList() {
    if (this.#restaurantDBService.isEmpty()) {
      this.#setMock();
    }
    const { category, sortCriteria } = this.#filterContainer.get();
    return this.#getDB(category, sortCriteria);
  }

  #setMock() {
    this.#restaurantDBService.set(restaurantListMock);
  }

  #getDB(category: CategoryOrAll, sortCriteria: SortCriteria) {
    return this.#restaurantDBService.getAfterFiltering(category, sortCriteria);
  }

  #onChangeFilterContainer(event: Event) {
    this.render();
  }
}

customElements.define('all-restaurant-app', AllRestaurantApp, { extends: 'div' });

export default AllRestaurantApp;
