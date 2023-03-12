/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Restaurant, { RestaurantProps } from './domain/Restaurant';
import Restaurants from './domain/Restaurants';
import { CustomRegisterRestaurantModalElement, CustomRestaurantListElement } from './components';
import { DEFAULT_RESTAURANTS } from './fixtures';
import { FILTER, SORT } from './utils/constants';

class App {
  #restaurants: Restaurant[] = DEFAULT_RESTAURANTS;

  #filterPipes: Partial<Record<'filter' | 'sort', (restaurants: Restaurant[]) => Restaurant[]>> = {
    sort: (_restaurants: Restaurant[]) => Restaurants.getSorted(_restaurants, Restaurants.byName),
  };

  $restaurantList = document.querySelector<CustomRestaurantListElement>('#restaurant-list')!;

  $modalOpenButton = document.querySelector<HTMLButtonElement>('#modal-open-button')!;

  constructor() {
    this.init();
  }

  init() {
    this.load();

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

  changeRestaurantFilter = ({ detail }: CustomEvent) => {
    if (detail.value === FILTER.value.entire) {
      const { filter, ...keys } = this.#filterPipes;
      this.#filterPipes = keys;
    } else {
      this.#filterPipes.filter = (_restaurants: Restaurant[]) =>
        Restaurants.filterByCategory(_restaurants, String(detail.value));
    }

    this.updateRestaurants();
  };

  changeRestaurantSort = ({ detail }: CustomEvent) => {
    const sortFilter = (_restaurants: Restaurant[]) =>
      Restaurants.getSorted(
        _restaurants,
        detail.value === SORT.value.name ? Restaurants.byName : Restaurants.byDistance,
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

  initEventHandlers() {
    this.$modalOpenButton.addEventListener('click', this.openRegisterRestaurantModal);
    document.addEventListener('changeFilter', this.changeRestaurantFilter as EventListener);
    document.addEventListener('changeSort', this.changeRestaurantSort as EventListener);
    document.addEventListener('createRestaurant', this.addRestaurant as EventListener);
  }
}

export default App;