/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Restaurant, { RestaurantProps } from './domain/Restaurant';
import Restaurants from './domain/Restaurants';
import {
  CustomRegisterRestaurantModalElement,
  CustomRestaurantListElement,
  CustomSelectElement,
} from './components';
import { DEFAULT_FILTER_OPTIONS, DEFAULT_RESTAURANTS, DEFAULT_SORT_OPTIONS } from './fixtures';
import { FILTER, SORT } from './utils/constants';

class App {
  #restaurants: Restaurant[] = DEFAULT_RESTAURANTS;

  #filterPipes: Partial<Record<'filter' | 'sort', (restaurants: Restaurant[]) => Restaurant[]>> = {
    sort: (_restaurants: Restaurant[]) => Restaurants.getSorted(_restaurants, Restaurants.byName),
  };

  $restaurantList = document.querySelector<CustomRestaurantListElement>('#restaurant-list')!;

  $restaurantFilterSelect = document.querySelector<CustomSelectElement>(
    '#restaurant-filter-select',
  )!;

  $restaurantSortSelect = document.querySelector<CustomSelectElement>('#restaurant-sort-select')!;

  $modalOpenButton = document.querySelector<HTMLButtonElement>('#modal-open-button')!;

  constructor() {
    this.init();
  }

  init() {
    this.load();

    this.initSelect();
    this.initEventHandlers();
  }

  updateRestaurants() {
    this.$restaurantList.setRestaurants(
      Object.values(this.#filterPipes).reduce(
        (filteredRestaurants, filter) => filter(filteredRestaurants),
        this.#restaurants,
      ),
    );

    this.save();
  }

  save() {
    localStorage.setItem('restaurants', JSON.stringify(this.#restaurants));
  }

  load() {
    const restaurants: Restaurant[] = JSON.parse(localStorage.getItem('restaurants') || '[]');

    if (restaurants.length !== 0) {
      this.#restaurants = restaurants.map((restaurant: Restaurant) =>
        Object.setPrototypeOf(restaurant, Restaurant.prototype),
      );
    }

    this.updateRestaurants();
  }

  changeRestaurantFilter = (event: Event) => {
    const $rSelect = event?.target as CustomSelectElement;
    const value = $rSelect.getSelectedOption()?.value;

    if (value === FILTER.value.entire) {
      const { filter, ...keys } = this.#filterPipes;
      this.#filterPipes = keys;
    } else {
      this.#filterPipes.filter = (_restaurants: Restaurant[]) =>
        Restaurants.filterByCategory(_restaurants, String(value));
    }

    this.updateRestaurants();
  };

  changeRestaurantSort = (event: Event) => {
    const $rSelect = event?.target as CustomSelectElement;

    const sortFilter = (_restaurants: Restaurant[]) =>
      Restaurants.getSorted(
        _restaurants,
        $rSelect.getSelectedOption()?.value === SORT.value.name
          ? Restaurants.byName
          : Restaurants.byDistance,
      );

    this.#filterPipes.sort = sortFilter;

    this.updateRestaurants();
  };

  openRegisterRestaurantModal = () => {
    const $registerRestaurantModal = '<r-register-restaurant-modal></r-register-restaurant-modal>';
    const $main = document.querySelector<HTMLElement>('main');

    if (!$main) return;

    $main.insertAdjacentHTML('beforeend', $registerRestaurantModal);
  };

  closeRegisterRestaurantModal = () => {
    const $registerRestaurantModal = document.querySelector<CustomRegisterRestaurantModalElement>(
      'r-register-restaurant-modal',
    );

    if (!$registerRestaurantModal) return;

    $registerRestaurantModal.remove();
  };

  addRestaurant = ({ detail }: CustomEvent) => {
    try {
      const restaurant = this.createRestaurant(detail);
      this.#restaurants.push(restaurant);
    } catch (e) {
      const error = e as Error;
      alert(error.message);
      return;
    }

    this.closeRegisterRestaurantModal();
    this.updateRestaurants();
  };

  createRestaurant = ({
    category,
    name,
    distanceByMinutes,
    description,
    referenceUrl,
  }: RestaurantProps) => {
    return new Restaurant({
      category,
      name,
      distanceByMinutes,
      description,
      referenceUrl,
    });
  };

  initSelect() {
    this.$restaurantFilterSelect.setOptions(DEFAULT_FILTER_OPTIONS);
    this.$restaurantSortSelect.setOptions(DEFAULT_SORT_OPTIONS);
  }

  initEventHandlers() {
    this.$restaurantFilterSelect.addEventListener('change', this.changeRestaurantFilter);
    this.$restaurantSortSelect.addEventListener('change', this.changeRestaurantSort);
    this.$modalOpenButton.addEventListener('click', this.openRegisterRestaurantModal);
    document.addEventListener('createRestaurant', this.addRestaurant as EventListener);
  }
}

export default App;
