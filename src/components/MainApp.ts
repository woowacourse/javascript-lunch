import '@/css/index.css';
import RestaurantList from './RestaurantList/RestaurantList';
import { Category, SortCriteria } from '@/types/Restaurant';
import FilterContainer from './FilterContainer/FilterContainer';
import NewRestaurantModal from './NewRestaurantModal/NewRestaurantModal';
import RestaurantDBService from '@/domains/services/RestaurantDBService';

class MainApp extends HTMLDivElement {
  #filterContainer: FilterContainer;
  #restaurantList: RestaurantList;
  #newRestaurantModal: NewRestaurantModal;

  constructor() {
    super();
    this.className = 'main-app';
    this.innerHTML = `<filter-container class="restaurant-filter-container"></filter-container>
    <ul is="restaurant-list" class="restaurant-list-container restaurant-list"></ul>
    <new-restaurant-modal class="modal"></new-restaurant-modal>`;

    this.#filterContainer = this.querySelector('.restaurant-filter-container')!;
    this.#restaurantList = this.querySelector('.restaurant-list')!;
    this.#newRestaurantModal = this.querySelector('.modal')!;
  }

  connectedCallback() {
    this.repaint();
  }

  repaint() {
    const restaurantDBService = new RestaurantDBService();
    const { category, sortCriteria } = this.#filterContainer.get();

    const newRestaurantList = restaurantDBService.getFromRestaurantList(
      category as Category,
      sortCriteria as SortCriteria,
    );

    this.#restaurantList.paint(newRestaurantList);
  }
}

customElements.define('main-app', MainApp, { extends: 'div' });

export default MainApp;
