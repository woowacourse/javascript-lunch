import { IRestaurantInfo } from '../domain/Restaurant';
import RestaurantCatalog, { SORT_CONDITION, ICatalogCategory, CATEGORY_ALL } from '../domain/RestaurantCatalog';
import RestaurantCard from './RestaurantCard';

const [SORT_BY_NAME, SORT_BY_DISTANCE] = SORT_CONDITION;

class RestaurantCards extends HTMLUListElement {
  #restaurants: IRestaurantInfo[];

  constructor(restaurants: IRestaurantInfo[]) {
    super();
    this.classList.add('restaurant-list');
    this.#restaurants = restaurants;
  }

  connectedCallback() {
    this.setAttribute('data-sort', SORT_BY_NAME);
    this.setAttribute('data-category', CATEGORY_ALL);
  }

  static get observedAttributes() {
    return ['data-category', 'data-sort'];
  }

  attributeChangedCallback() {
    this.clear();
    this.#renderRestaurantList();
  }

  clear() {
    this.innerHTML = '';
  }

  #renderRestaurantList() {
    const filteredRestaurantList = this.#filterRestaurantList();

    this.#sortRestaurantList(filteredRestaurantList);
  }

  #filterRestaurantList() {
    const categoryString = this.dataset.category;
    const category: ICatalogCategory = categoryString as ICatalogCategory;

    const filteredRestaurants = RestaurantCatalog.filterByCategory(this.#restaurants, category);

    return filteredRestaurants;
  }

  #sortRestaurantList(restaurants: IRestaurantInfo[]) {
    if (this.dataset.sort === SORT_BY_NAME) {
      this.#appendRestaurantElement(RestaurantCatalog.sortByName(restaurants));
    }
    if (this.dataset.sort === SORT_BY_DISTANCE) {
      this.#appendRestaurantElement(RestaurantCatalog.sortByDistance(restaurants));
    }
  }

  #appendRestaurantElement(restaurants: IRestaurantInfo[]) {
    restaurants.forEach((restaurant: IRestaurantInfo) => {
      const item = new RestaurantCard(restaurant);
      this.appendChild(item);
    });
  }
}

export default RestaurantCards;
