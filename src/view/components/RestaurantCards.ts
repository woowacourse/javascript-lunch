import { IRestaurantInfo } from '../../domain/Restaurant';
import RestaurantCatalog, { SORT_CONDITION, ICatalogCategory } from '../../domain/RestaurantCatalog';

const IMG_CATEGORY = Object.freeze({
  한식: 'korean',
  아시안: 'asian',
  중식: 'chinese',
  기타: 'etc',
  양식: 'western',
  일식: 'japanese',
});

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
    this.setAttribute('data-category', '전체');
  }

  static get observedAttributes() {
    return ['data-category', 'data-sort'];
  }

  attributeChangedCallback() {
    this.clear();
    this.#renderList();
  }

  clear() {
    this.innerHTML = '';
  }

  #renderList() {
    if (this.dataset.category) {
      const categoryString = this.dataset.category;
      const category: ICatalogCategory = categoryString as ICatalogCategory;

      const filteredRestaurants = RestaurantCatalog.filterByCategory(this.#restaurants, category);

      this.#appendList(filteredRestaurants);
    }
  }

  #appendList(restaurants: IRestaurantInfo[]) {
    if (this.dataset.sort === SORT_BY_NAME) {
      this.#makeRestaurantElement(RestaurantCatalog.sortByName(restaurants));
    }
    if (this.dataset.sort === SORT_BY_DISTANCE) {
      this.#makeRestaurantElement(RestaurantCatalog.sortByDistance(restaurants));
    }
  }

  #makeRestaurantElement(restaurants: IRestaurantInfo[]) {
    restaurants.forEach((restaurant: IRestaurantInfo) => {
      const liElement = document.createElement('li');
      liElement.classList.add('restaurant');
      liElement.innerHTML = this.#generateRestaurantElementTemplate(restaurant);
      this.appendChild(liElement);
    });
  }

  #generateRestaurantElementTemplate(restaurant: IRestaurantInfo) {
    const categoryKey = restaurant.category as keyof typeof IMG_CATEGORY;
    return `
    <div class="restaurant__category">
      <img src="./assets/category-${IMG_CATEGORY[categoryKey]}.png" alt="${restaurant.category}" class="category-icon">
    </div>
    <div class="restaurant__info">
      <h3 class="restaurant__name text-subtitle">${restaurant.name}</h3>
      <span class="restaurant__distance text-body">캠퍼스부터 ${restaurant.distanceFromCampus}분 내</span>
      <p class="restaurant__description text-body">${restaurant.description}</p>
    </div>
  `;
  }
}

export default RestaurantCards;
