import { IRestaurantInfo } from '../domain/Restaurant';
import RestaurantCatalog, { SORT_CONDITION, ICatalogCategory, CATEGORY_ALL } from '../domain/RestaurantCatalog';
import { NAV_FAVORITE, NAV_TOTAL } from './Navigator/Navigator';
import RestaurantCard from './RestaurantCard';

const [SORT_BY_NAME, SORT_BY_DISTANCE] = SORT_CONDITION;

class RestaurantList extends HTMLUListElement {
  #restaurants: IRestaurantInfo[] = [];

  #categoryFilter: string;

  #sortCondition: string;

  #navState: string = NAV_TOTAL;

  constructor() {
    super();
    this.classList.add('restaurant-list');
    this.#categoryFilter = CATEGORY_ALL;
    this.#sortCondition = SORT_BY_NAME;
  }

  renderRestaurantList(restaurants: IRestaurantInfo[]) {
    this.#restaurants = restaurants;
    this.#makeRestaurantList();
  }

  renderFavoriteRestaurantList(navState: string) {
    this.#navState = navState;
    this.#makeRestaurantList();
  }

  updateCategoryFilter(category: string) {
    this.#categoryFilter = category;
    this.#makeRestaurantList();
  }

  updateSortCondition(sortCondition: string) {
    this.#sortCondition = sortCondition;
    this.#makeRestaurantList();
  }

  #clear() {
    this.innerHTML = '';
  }

  #makeRestaurantList() {
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
    if (this.#navState === NAV_FAVORITE) {
      restaurants.forEach((restaurant: IRestaurantInfo) => {
        if (restaurant.isFavorite === true) {
          const item = new RestaurantCard(restaurant);

          this.appendChild(item);
        }
      });
    } else {
      restaurants.forEach((restaurant: IRestaurantInfo) => {
        const item = new RestaurantCard(restaurant);

        this.appendChild(item);
      });
    }
  }
}

export default RestaurantList;
