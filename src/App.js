import RestaurantList from './components/RestaurantList';
import Modal from './components/Modal';
import CategorySelectBox from './components/CategorySelectBox';
import SortSelectBox from './components/SortSelectBox';

import Restaurants from './domain/Restaurants';
import Validator from './domain/Validator';
import {
  getFilteredRestaurantsByCategory,
  getSortedRestaurants,
  getFavoriteRestaurants,
} from './domain/utils';

import { $ } from './utils/dom';
import store from './utils/store';
import primaryKeyGenerator from './utils/primaryKeyGenerator';

import { RESTAURANTS_KEY } from './constants/storeKey';

export default class App {
  #restaurants;

  constructor() {
    const restaurantsData = store.getLocalStorage(RESTAURANTS_KEY);
    this.#restaurants = new Restaurants(restaurantsData);

    Modal.render($('#modal'));
    new CategorySelectBox().render($('#restaurant-filter-container'));
    new SortSelectBox().render($('#restaurant-filter-container'));
    this.renderRestaurantListByFilterOptions();

    this.bindEvents();
  }

  bindEvents() {
    $('#modal').addEventListener('submit', this.onSubmitAddRestaurantForm.bind(this));
    $('#restaurant-filter-container').addEventListener(
      'change',
      this.renderRestaurantListByFilterOptions.bind(this)
    );
    $('#modal-open-button').addEventListener(
      'click',
      this.onClickRestaurantFormModalOpenButton.bind(this)
    );
    $('#form-modal-close-button').addEventListener('click', this.toggleModal);

    $('#restaurant-list-container').addEventListener(
      'click',
      this.onClickRestaurantList.bind(this)
    );

    $('#restaurant-favorite-tab').addEventListener('change', this.onChangeFavoriteTab.bind(this));
  }

  onSubmitAddRestaurantForm(e) {
    e.preventDefault();

    const {
      category: { value: category },
      name: { value: name },
      distance: { value: distance },
      description: { value: description },
      link: { value: link },
    } = e.target.elements;

    try {
      Validator.validateFormData({ category, name, distance, link });
    } catch ({ message }) {
      alert(message);

      return;
    }

    const uniqueId = primaryKeyGenerator();

    const restaurant = {
      id: uniqueId,
      category,
      name,
      distance,
      description,
      link,
      isFavorite: false,
    };

    this.#restaurants.addRestaurant(restaurant);
    store.setLocalStorage(RESTAURANTS_KEY, this.#restaurants.getRestaurants());

    this.toggleModal();

    $('#tab-all').checked = true;
    $('#restaurant-filter-container').classList.remove('hide');
    this.renderRestaurantListByFilterOptions();
  }

  renderRestaurantListByFilterOptions() {
    const categoryOption = $('#category-filter').value;
    const sortOption = $('#sorting-filter').value;
    const restaurants = this.#restaurants.getRestaurants();

    const filteredRestaurants = getFilteredRestaurantsByCategory(restaurants, categoryOption);
    const sortedRestaurants = getSortedRestaurants(filteredRestaurants, sortOption);

    RestaurantList.render($('#restaurant-list-container'), sortedRestaurants);
  }

  onClickRestaurantFormModalOpenButton() {
    Modal.render($('#modal'));

    $('#form-modal-close-button').addEventListener('click', this.toggleModal);

    this.toggleModal();
  }

  toggleModal() {
    $('#modal').classList.toggle('hide');
  }

  onClickRestaurantList(e) {
    if (e.target.id === 'favorite-icon') {
      const restaurantId = e.target.closest('li').dataset.listid;

      this.#restaurants.toggleFavoriteRestaurant(Number(restaurantId));

      const restaurants = this.#restaurants.getRestaurants();
      store.setLocalStorage(RESTAURANTS_KEY, restaurants);

      if ($('#tab-all').checked) {
        this.renderRestaurantListByFilterOptions();
        return;
      }

      const favoriteRestaurants = getFavoriteRestaurants(restaurants);
      RestaurantList.render($('#restaurant-list-container'), favoriteRestaurants);

      return;
    }

    const restaurantId = e.target.closest('li').dataset.listid;
    const targetRestaurant = this.#restaurants.getRestaurantById(Number(restaurantId));

    Modal.render($('#modal'), targetRestaurant);
    this.toggleModal();
  }

  onChangeFavoriteTab(e) {
    if (e.target.value === 'favorite') {
      const restaurants = this.#restaurants.getRestaurants();
      const favoriteRestaurants = getFavoriteRestaurants(restaurants);

      RestaurantList.render($('#restaurant-list-container'), favoriteRestaurants);
      $('#restaurant-filter-container').classList.add('hide');

      return;
    }

    this.renderRestaurantListByFilterOptions();
    $('#restaurant-filter-container').classList.remove('hide');
  }
}
