import '@/css/index.css';
import RestaurantList from './RestaurantList/RestaurantList';
import { Category, SortCriteria } from '@/types/Restaurant';
import FilterContainer from './FilterContainer/FilterContainer';
import NewRestaurantModal from './NewRestaurantModal/NewRestaurantModal';
import RestaurantDBService from '@/domains/services/RestaurantDBService';
import restaurantListMock from '@/mock/restaurantList.mock';

class MainApp extends HTMLDivElement {
  #filterContainer: FilterContainer;
  #restaurantList: RestaurantList;
  #newRestaurantModal: NewRestaurantModal;
  #restaurantDBService: RestaurantDBService;

  constructor() {
    super();
    this.className = 'main-app';
    this.innerHTML = `<filter-container class="restaurant-filter-container"></filter-container>
    <ul is="restaurant-list" class="restaurant-list-container restaurant-list"></ul>
    <div is="new-restaurant-modal" class="modal"></div>`;

    this.#filterContainer = this.querySelector('.restaurant-filter-container')!;
    this.#restaurantList = this.querySelector('.restaurant-list')!;
    this.#newRestaurantModal = this.querySelector('.modal')!;
    this.#restaurantDBService = new RestaurantDBService();
  }

  connectedCallback() {
    this.paint();
  }

  paint() {
    const { category, sortCriteria } = this.#filterContainer.get();

    let newRestaurantList = this.#getDB(category as Category, sortCriteria as SortCriteria);
    if (!newRestaurantList) {
      this.#setMock();
      newRestaurantList = this.#getDB(category as Category, sortCriteria as SortCriteria);
    }

    this.#restaurantList.paint(newRestaurantList);
  }

  #setMock() {
    this.#restaurantDBService.set(restaurantListMock);
  }

  #getDB(category: Category, sortCriteria: SortCriteria) {
    return this.#restaurantDBService.getFromRestaurantList(category, sortCriteria);
  }
}

customElements.define('main-app', MainApp, { extends: 'div' });

export default MainApp;
