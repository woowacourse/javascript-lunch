import Restaurants from './domain/Restaurants';
import { $ } from './utils/dom';

export default class App {
  #restaurants;

  constructor() {
    this.#restaurants = new Restaurants();
    this.init();
  }

  init() {
    $('.restaurant-filter-container').addEventListener(
      'change',
      this.onChangeFilterContainer.bind(this)
    );
  }

  onChangeFilterContainer() {
    const categoryOption = $('#category-filter').value;
    const sortOption = $('#sorting-filter').value;

    const filterdRestaurants = this.#restaurants.getFilteredRestaurantsByCategory(categoryOption);

    const sortedRestaurants = this.#restaurants.getSortedRestaurants(
      filterdRestaurants,
      sortOption
    );

    this.render(sortedRestaurants);
  }

  getTemplate(restaurants) {
    const imgFileName = {
      한식: 'category-korean',
      중식: 'category-chinese',
      일식: 'category-japanese',
      아시안: 'category-asian',
      양식: 'category-western',
      기타: 'category-etc',
    };

    const template = `
      <ul class="restaurant-list">
      ${restaurants.reduce((html, restaurant) => {
        return (
          html +
          `
        <li class="restaurant">
          <div class="restaurant__category">
            <img src="./${imgFileName[`${restaurant.category}`]}.png" alt="${
            restaurant.category
          }" class="category-icon" />
          </div>
          <div class="restaurant__info">
            <h3 class="restaurant__name text-subtitle">${restaurant.name}</h3>
            <span class="restaurant__distance text-body">캠퍼스부터 ${
              restaurant.distance
            }분 내</span>
            <p class="restaurant__description text-body">${restaurant.description}</p>
          </div>
        </li>`
        );
      }, '')}
      </ul>`;

    return template;
  }

  render(restaurants) {
    const template = this.getTemplate(restaurants);

    $('.restaurant-list-container').innerHTML = template;
  }
}
