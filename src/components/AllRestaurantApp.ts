import '@/css/index.css';
import RestaurantList from './RestaurantList/RestaurantList';
import { Category, SortCriteria } from '@/types/Restaurant';
import FilterContainer from './FilterContainer/FilterContainer';
import NewRestaurantModal from './NewRestaurantModal/NewRestaurantModal';
import RestaurantDBService from '@/domains/services/RestaurantDBService';
import restaurantListMock from '@/mock/restaurantList.mock';
import FavoriteIcon from './Basic/FavoriteIcon';

class AllRestaurantApp extends HTMLDivElement {
  #filterContainer: FilterContainer;
  #restaurantList: RestaurantList;
  #restaurantDBService: RestaurantDBService;

  observedAttributes = [];

  constructor() {
    super();
    this.classList.add('all-retaurant-app');
    this.innerHTML = `
    <filter-container class="restaurant-filter-container"></filter-container>
    <ul is="restaurant-list" class="restaurant-list-container restaurant-list"></ul>
    `;

    this.#filterContainer = this.querySelector('.restaurant-filter-container')!;
    this.#restaurantList = this.querySelector('.restaurant-list')!;
    //this.#newRestaurantModal = this.querySelector('.modal')!;
    this.#restaurantDBService = new RestaurantDBService();
    this.paint();
    this.addEventListener('click', (event) => {
      if (event.target instanceof FavoriteIcon) {
        console.log(
          (event.target.parentElement?.parentElement?.parentElement as RestaurantList).get(),
        );
        const restaurants = (
          event.target.parentElement?.parentElement?.parentElement as RestaurantList
        ).get();
        this.#restaurantDBService.set(restaurants);
      }
    });
  }
  connectedCallback() {
    this.paint();
  }
  paint() {
    this.#restaurantList.paint(this.#getNewRestaurantList());
  }

  #getNewRestaurantList() {
    const { category, sortCriteria } = this.#filterContainer.get();

    let newRestaurantList = this.#getDB(category as Category, sortCriteria as SortCriteria);
    if (!newRestaurantList) {
      this.#setMock();
      newRestaurantList = this.#getDB(category as Category, sortCriteria as SortCriteria);
    }
    return newRestaurantList;
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
