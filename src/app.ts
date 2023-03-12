/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Restaurant, { RestaurantProps } from './domain/Restaurant';
import Restaurants from './domain/Restaurants';
import render from './render';
import { DEFAULT_RESTAURANTS } from './fixtures';
import { FILTER, SORT } from './utils/constants';
import { getRestaurants, saveRestaurants } from './utils/localStorage';

class App {
  #restaurants: Restaurant[] = DEFAULT_RESTAURANTS;

  #restaurantListType: 'all' | 'favorite' = 'all';

  #filterPipes: Partial<
    Record<'filter' | 'sort' | 'type', (restaurants: Restaurant[]) => Restaurant[]>
  > = {};

  constructor() {
    this.init();
  }

  init = () => {
    this.initFilterPipes();
    this.initEventHandlers();
  };

  initFilterPipes = () => {
    this.#filterPipes = {
      sort: (_restaurants: Restaurant[]) => Restaurants.getSorted(_restaurants, Restaurants.byName),
      type: (_restaurants: Restaurant[]) => Restaurants.getAll(_restaurants),
    };
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

  openRestaurantDetailModal = ({ detail }: CustomEvent) => {
    const { name } = detail;

    const restaurant = this.#restaurants.filter((_restaurant) => _restaurant.getName() === name)[0];

    render.openRestaurantDetailModal(restaurant);
  };

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

  toggleRestaurantFavorite = ({ detail }: CustomEvent) => {
    const { restaurantName } = detail;

    this.#restaurants.forEach((restaurant) => {
      if (restaurant.getName() === restaurantName) restaurant.toggleFavorite();
    });

    render.toggleRestaurantFavorite(restaurantName);
    saveRestaurants(this.#restaurants);

    if (this.#restaurantListType === 'favorite')
      render.deleteRestaurantInFavoriteList(restaurantName);
  };

  chagneRestaurantType = ({ detail }: CustomEvent) => {
    const { type } = detail;

    this.#filterPipes.type = type === 'all' ? Restaurants.getAll : Restaurants.getFavorite;

    if (type === 'all') {
      render.openSearchRestaurantSection();
      this.initFilterPipes();
    } else {
      render.closeSearchRestaurantSection();
    }

    this.#restaurantListType = type;
    this.updateRestaurantsList();
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
    document.addEventListener('toggleFavorite', this.toggleRestaurantFavorite as EventListener);
    document.addEventListener('chagneRestaurantType', this.chagneRestaurantType as EventListener);
  }
}

export default App;
