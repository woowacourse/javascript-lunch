import { IRestaurantInfo } from '../domain/Restaurant';
import RestaurantCatalog, { SORT_CONDITION, ICatalogCategory, CATEGORY_ALL } from '../domain/RestaurantCatalog';
import RestaurantCard from './RestaurantCard';

const [SORT_BY_NAME, SORT_BY_DISTANCE] = SORT_CONDITION;

class RestaurantList extends HTMLUListElement {
  #restaurants: IRestaurantInfo[] = [];

  #categoryFilter: string;

  #sortCondition: string;

  constructor() {
    super();
    this.classList.add('restaurant-list');
    this.#categoryFilter = CATEGORY_ALL;
    this.#sortCondition = SORT_BY_NAME;
  }

  renderRestaurantList(restaurants: IRestaurantInfo[]) {
    this.#restaurants = restaurants;
    this.#renderRestaurantList();
  }

  updateCategoryFilter(category: string) {
    this.#categoryFilter = category;
    this.#renderRestaurantList();
  }

  updateSortCondition(sortCondition: string) {
    this.#sortCondition = sortCondition;
    this.#renderRestaurantList();
  }

  #clear() {
    this.innerHTML = '';
  }

  #renderRestaurantList() {
    const filteredRestaurantList = this.#filterRestaurantList();

    this.#sortRestaurantList(filteredRestaurantList);
  }

  #filterRestaurantList() {
    const category = this.#categoryFilter as ICatalogCategory;

    const filteredRestaurants = RestaurantCatalog.filterByCategory(this.#restaurants, category);

    return filteredRestaurants;
  }

  #sortRestaurantList(restaurants: IRestaurantInfo[]) {
    if (this.#sortCondition === SORT_BY_NAME) {
      this.#appendRestaurantElement(RestaurantCatalog.sortByName(restaurants));
    }
    if (this.#sortCondition === SORT_BY_DISTANCE) {
      this.#appendRestaurantElement(RestaurantCatalog.sortByDistance(restaurants));
    }
  }

  #appendRestaurantElement(restaurants: IRestaurantInfo[]) {
    this.#clear();
    restaurants.forEach((restaurant: IRestaurantInfo) => {
      const item = new RestaurantCard(restaurant);
      this.appendChild(item);
    });
  }
}

export default RestaurantList;
