import { $ } from '../../utils/dom';
import RestaurantFilter from '../RestaurantFilter/RestaurantFilter';
import RestaurantList from '../RestaurantList/RestaurantList';

export default class BookmarkNavigation {
  #element;
  #restaurants;

  constructor(element, restaurants) {
    this.#restaurants = restaurants;
    this.#element = element;
    this.render();
    this.#addEvents();
  }

  render() {
    this.#element.innerHTML = /*html*/ `
      <nav id="restaurants-selector-container" class="restaurants-selector-container">
        <ul id="restaurant-list-selector" class="restaurant-list-selector">
          <li id="all-restaurants" class="restaurant-list-select-item selected--item">모든 음식점</li>
          <li id="favorite-restaurants" class="restaurant-list-select-item">자주 가는 음식점</li>
        </ul>
      </nav>
    `;
  }

  #addEvents() {
    $('restaurant-list-selector').addEventListener('click', (event) => {
      this.#handleSelectedItem(event);
    });

    $('all-restaurants').addEventListener('click', (event) =>
      this.#handleClickAllRestaurants(event),
    );
    $('favorite-restaurants').addEventListener('click', (event) =>
      this.#handleClickFavoriteRestaurants(event),
    );
  }

  #handleClickAllRestaurants(event) {
    if (!event.target.classList.contains('selected--item')) {
      new RestaurantFilter($('content'), this.#restaurants);
      new RestaurantList($('restaurant-list'), {
        restaurants: this.#restaurants,
        renderList: this.#restaurants.standardList,
      });
    }
  }

  #handleClickFavoriteRestaurants(event) {
    if (!event.target.classList.contains('selected--item')) {
      $('restaurant-filter-container').remove();
      new RestaurantList($('restaurant-list'), {
        restaurants: this.#restaurants,
        renderList: this.#restaurants.favoriteList,
      });
    }
  }

  #handleSelectedItem(event) {
    document
      .querySelectorAll('.restaurant-list-select-item')
      .forEach((element) => element.classList.remove('selected--item'));
    event.target.classList.add('selected--item');
  }
}
