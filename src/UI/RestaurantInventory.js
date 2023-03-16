import { $ } from '../utils/Dom';
import { getRestaurantListFromLocalstorage } from '../utils/LocalStorage';
import {
  RESTAURANT_LOCALSTORAGE_KEY,
  FAVORITE_LOCALSTORAGE_KEY,
  FAVORITE_VALUE,
  FAVORITE_ENROLL,
} from '../utils/Constant';

export default class RestaurantInventory {
  #template = `
    <div class="restaurant-tab">
        <div class="all-restaurant active">
            <span>모든 음식점</span>
        </div>
        <div class="favorite-restaurant inactive">
            <span>자주 가는 음식점</span>
        </div>
    </div>
    `;

  constructor(restaurantRegistry) {
    this.restaurantRegistry = restaurantRegistry;
  }

  render() {
    $('main').insertAdjacentHTML('afterbegin', this.#template);
  }

  initializeButtonEvents() {
    $('.all-restaurant').addEventListener('click', () => {
      RestaurantInventory.favoriteTabToAllListTab();
      $('.restaurant-list').replaceChildren();

      const restaurantAll = getRestaurantListFromLocalstorage(RESTAURANT_LOCALSTORAGE_KEY);
      this.restaurantRegistry.attachRestaurantToRegistry(restaurantAll);
    });

    $('.favorite-restaurant').addEventListener('click', () => {
      RestaurantInventory.allListTabToFavoriteTab();
      $('.restaurant-list').replaceChildren();

      const restaurantFavorite = getRestaurantListFromLocalstorage(FAVORITE_LOCALSTORAGE_KEY);
      restaurantFavorite.forEach(restaurant => (restaurant[FAVORITE_VALUE] = FAVORITE_ENROLL));
      this.restaurantRegistry.attachRestaurantToRegistry(restaurantFavorite);
    });
  }

  static favoriteTabToAllListTab = function () {
    $('.all-restaurant').classList.remove('inactive');
    $('.all-restaurant').classList.add('active');
    $('.favorite-restaurant').classList.remove('active');
    $('.favorite-restaurant').classList.add('inactive');
    $('.restaurant-filter-container').className = 'restaurant-filter-container';
  };

  static allListTabToFavoriteTab = function () {
    $('.favorite-restaurant').classList.remove('inactive');
    $('.favorite-restaurant').classList.add('active');
    $('.all-restaurant').classList.remove('active');
    $('.all-restaurant').classList.add('inactive');
    $('.restaurant-filter-container').className = 'restaurant-filter-container filter-container-close';
  };
}
