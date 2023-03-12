/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Restaurant, { RestaurantProps } from './domain/Restaurant';
import Restaurants from './domain/Restaurants';

import { CustomRestaurantListElement } from './components';
import { DEFAULT_RESTAURANTS } from './fixtures';
import { FILTER, SORT } from './utils/constants';
import render from './render';

class App {
  #restaurants: Restaurant[] = DEFAULT_RESTAURANTS;

  $restaurantList: CustomRestaurantListElement | null = null;

  #filterPipes: Partial<Record<'filter' | 'sort', (restaurants: Restaurant[]) => Restaurant[]>> = {
    sort: (_restaurants: Restaurant[]) => Restaurants.getSorted(_restaurants, Restaurants.byName),
  };

  constructor() {
    this.init();
  }

  init() {
    this.initEventHandlers();
  }

  updateRestaurantsList() {
    if (!this.$restaurantList)
      this.$restaurantList =
        document.querySelector<CustomRestaurantListElement>('#restaurant-list')!;

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
    const sortFilter = (_restaurants: Restaurant[]) =>
      Restaurants.getSorted(
        _restaurants,
        detail.value === SORT.value.name ? Restaurants.byName : Restaurants.byDistance,
      );

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

  initEventHandlers() {
    document.addEventListener('openModal', render.openRegisterRestaurantModal);
    document.addEventListener('changeFilter', this.changeRestaurantFilter as EventListener);
    document.addEventListener('changeSort', this.changeRestaurantSort as EventListener);
    document.addEventListener('createRestaurant', this.addRestaurant as EventListener);

    window.addEventListener('load', () => {
      const $lunchApp = document.querySelector<HTMLDivElement>('#lunch-app');

      if (!$lunchApp) return;

      $lunchApp.insertAdjacentHTML(
        'afterbegin',
        ` <r-header></r-header>
          <main>
            <r-search-restaurant-section></r-search-restaurant-section>
            <r-restaurant-list id="restaurant-list"></r-restaurant-list>,
          </main>
        `,
      );

      const restaurants: Restaurant[] = JSON.parse(localStorage.getItem('restaurants') || '[]');

      if (restaurants.length !== 0) {
        this.#restaurants = restaurants.map((restaurant: Restaurant) =>
          Object.setPrototypeOf(restaurant, Restaurant.prototype),
        );
      }

      this.updateRestaurantsList();
    });
  }
}

export default App;