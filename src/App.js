import RestaurantList from './components/RestaurantList';
import CategoryFilter from './components/CategoryFilter';

import Restaurants from './domain/Restaurants';
import Validator from './domain/Validator';

import { $ } from './utils/dom';
import store from './utils/store';

export default class App {
  #restaurants;

  constructor() {
    const restaurantsData = store.getLocalStorage();
    this.#restaurants = new Restaurants(restaurantsData);
    CategoryFilter.render();
    this.renderRestaurantListByFilterOptions();
    this.init();
  }

  init() {
    $('.add-restaurant-form').addEventListener('submit', this.onSubmitAddRestaurantForm.bind(this));
    $('.restaurant-filter-container').addEventListener(
      'change',
      this.renderRestaurantListByFilterOptions.bind(this)
    );
    $('.modal-open-button').addEventListener(
      'click',
      this.onClickRestaurantFormModalOpenButton.bind(this)
    );
    $('.modal-close-button').addEventListener('click', this.toggleModal);
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

    const restaurant = {
      category,
      name,
      distance,
      description,
      link,
    };

    this.#restaurants.addRestaurant(restaurant);
    store.setLocalStorage(this.#restaurants.getRestaurants());

    this.toggleModal();

    this.renderRestaurantListByFilterOptions();
  }

  renderRestaurantListByFilterOptions() {
    const categoryOption = $('#category-filter').value;
    const sortOption = $('#sorting-filter').value;

    const filteredRestaurants = this.#restaurants.getFilteredRestaurantsByCategory(categoryOption);

    const sortedRestaurants = this.#restaurants.getSortedRestaurants(
      filteredRestaurants,
      sortOption
    );

    RestaurantList.render(sortedRestaurants);
  }

  onClickRestaurantFormModalOpenButton() {
    $('.add-restaurant-form').reset();

    this.toggleModal();
  }

  toggleModal() {
    $('.modal').classList.toggle('modal--open');
  }
}
