/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Restaurant, { RestaurantProps } from './domain/Restaurant';
import Restaurants from './domain/Restaurants';
import render from './render';
import { DEFAULT_RESTAURANTS } from './fixtures';
import { FILTER, SORT } from './utils/constants';
import { getRestaurants, saveRestaurants } from './utils/localStorage';

class App {
  #restaurants: Restaurant[] = DEFAULT_RESTAURANTS;

  #filterPipes: Partial<Record<'filter' | 'sort', (restaurants: Restaurant[]) => Restaurant[]>> = {
    sort: (_restaurants: Restaurant[]) => Restaurants.getSorted(_restaurants, Restaurants.byName),
  };

  constructor() {
    this.init();
  }

  init = () => {
    this.initEventHandlers();
  };

  updateRestaurantsList = () => {
    const updatedRestaurantsList = Object.values(this.#filterPipes).reduce(
      (filteredRestaurants, filter) => filter(filteredRestaurants),
      this.#restaurants,
    );

    render.restaurantList(updatedRestaurantsList);
    saveRestaurants(this.#restaurants);
  };

  changeRestaurantFilter = ({ detail }: CustomEvent) => {
    if (detail.value === FILTER.value.entire) {
      const { filter, ...keys } = this.#filterPipes;
      this.#filterPipes = keys;
    } else {
      this.#filterPipes.filter = (_restaurants: Restaurant[]) =>
        Restaurants.filterByCategory(_restaurants, String(detail.value));
    }

    this.updateRestaurantsList();
  };

  changeRestaurantSort = ({ detail }: CustomEvent) => {
    const compareFn =
      detail.value === SORT.value.name ? Restaurants.byName : Restaurants.byDistance;

    const sortFilter = (_restaurants: Restaurant[]) =>
      Restaurants.getSorted(_restaurants, compareFn);

    this.#filterPipes.sort = sortFilter;
    this.updateRestaurantsList();
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

    render.closeRegisterRestaurantModal();
    this.updateRestaurantsList();
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

  openRestaurantDetailModal = ({ detail }: CustomEvent) => render.openRestaurantDetailModal(detail);

  initLoad = () => {
    render.init();

    const restaurants: Restaurant[] = getRestaurants();

    if (restaurants.length !== 0) {
      this.#restaurants = restaurants.map((restaurant: Restaurant) =>
        Object.setPrototypeOf(restaurant, Restaurant.prototype),
      );
    }

    this.updateRestaurantsList();
  };

  deleteRestaurant = ({ detail }: CustomEvent) => {
    this.#restaurants = this.#restaurants.filter(
      (restaurant) => restaurant.getName() !== detail.name,
    );

    this.updateRestaurantsList();
    render.closeRestaurantDetailModal();
  };

  initEventHandlers() {
    window.addEventListener('load', this.initLoad);
    document.addEventListener('openRegisterRestauranModal', render.openRegisterRestaurantModal);
    document.addEventListener('changeFilter', this.changeRestaurantFilter as EventListener);
    document.addEventListener('changeSort', this.changeRestaurantSort as EventListener);
    document.addEventListener('createRestaurant', this.addRestaurant as EventListener);
    document.addEventListener(
      'openRestaurantDetailModal',
      this.openRestaurantDetailModal as EventListener,
    );
    document.addEventListener('deleteRestaurant', this.deleteRestaurant as EventListener);
  }
}

export default App;