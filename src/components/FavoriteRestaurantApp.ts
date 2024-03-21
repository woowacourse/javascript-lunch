import '@/css/index.css';
import RestaurantList from './RestaurantList/RestaurantList';
import { Category, IRestaurant, SortCriteria } from '@/types/Restaurant';
import FilterContainer from './Basic/FilterContainer';
import RestaurantDBService from '@/domains/services/RestaurantDBService';
import restaurantListMock from '@/mock/restaurantList.mock';
import FavoriteIcon from './Basic/FavoriteIcon';
import RestaurantItem from './RestaurantList/RestaurantItem';
import Restaurant from '@/domains/entities/Restaurant';

class FavoriteRestaurantApp extends HTMLDivElement {
  #filterContainer: FilterContainer;
  #restaurantList: RestaurantList;
  #restaurantDBService: RestaurantDBService;

  observedAttributes = [];

  constructor() {
    super();
    this.classList.add('favorite-restaurant-app');
    this.innerHTML = `
    <filter-container class="restaurant-filter-container"></filter-container>
    <ul is="restaurant-list" class="restaurant-list-container restaurant-list"></ul>
    `;

    this.#filterContainer = this.querySelector('.restaurant-filter-container')!;
    this.#restaurantList = this.querySelector('.restaurant-list')!;
    this.#restaurantDBService = new RestaurantDBService();
    this.render();
    this.addEventListener('click', this.#onClickFavoriteIcon.bind(this));
  }
  render() {
    this.#restaurantList.paint(this.#getNewRestaurantList());
  }

  #getNewRestaurantList() {
    const { category, sortCriteria } = this.#filterContainer.get();

    let newRestaurantList = this.#getDB(category as Category, sortCriteria as SortCriteria);
    if (newRestaurantList.length === 0) {
      this.#setMock();
      newRestaurantList = this.#getDB(category as Category, sortCriteria as SortCriteria);
    }
    return newRestaurantList.filter((restaurant: IRestaurant) => restaurant.isFavorite);
  }

  #setMock() {
    this.#restaurantDBService.set(restaurantListMock);
  }

  #getDB(category: Category, sortCriteria: SortCriteria) {
    return this.#restaurantDBService.getFromRestaurantList(category, sortCriteria);
  }

  #onClickFavoriteIcon(event: Event) {
    if (!(event.target instanceof FavoriteIcon)) return;
    const restaurants = new RestaurantDBService().get();
    const targetRestaurant = event.target.parentElement?.parentElement as RestaurantItem;
    const newRestaurants = restaurants.filter(
      (restaurant: IRestaurant) => !new Restaurant(restaurant).isEqual(targetRestaurant.get()),
    );
    newRestaurants.push(targetRestaurant.get());
    this.#restaurantDBService.set(newRestaurants);
    this.render();
  }
}

customElements.define('favorite-restaurant-app', FavoriteRestaurantApp, { extends: 'div' });

export default FavoriteRestaurantApp;
