import { allCustomElementsDefined } from '@/components/lifecycles';
import type { RestaurantProps } from '@/domain/Restaurant';
import Restaurant from '@/domain/Restaurant';
import type { RestaurantFilter } from '@/domain/RestaurantFilters';
import { DEFAULT_RESTAURANTS } from '@/fixtures';
import type { IStorage } from '@/storage/IStorage';
import type { IParser } from '@/storage/parsers/IParser';
import RestaurantsJSONParser from '@/storage/parsers/RestaurantsJSONParser';
import RestaurantsLocalStorage from '@/storage/RestaurantsLocalStorage';

export interface RestaurantsState {
  restaurantIdCounter: number;

  restaurants: Restaurant[];
}

export type RestaurantsListenerFn = (restaurants: Restaurants) => void;

export class Restaurants implements RestaurantsState {
  #eventListeners: RestaurantsListenerFn[] = [];

  filters: RestaurantFilter[] = [];

  restaurantIdCounter = 0;

  restaurants: Restaurant[] = [];

  private readonly parser: IParser<RestaurantsState> = new RestaurantsJSONParser();

  private readonly storage: IStorage<RestaurantsState> = new RestaurantsLocalStorage(this.parser, {
    restaurantIdCounter: 0,
    restaurants: DEFAULT_RESTAURANTS.map((createFn) => createFn(this.assignId())),
  });

  constructor() {
    const loadedState = this.storage.load();
    this.restaurantIdCounter = loadedState.restaurantIdCounter;
    this.restaurants = loadedState.restaurants;

    this.updateComponents();
  }

  create(restaurantProps: Omit<RestaurantProps, 'id'>) {
    const restaurant = new Restaurant({
      id: this.assignId(),
      ...restaurantProps,
    });
    this.restaurants.push(restaurant);
    this.updateComponents();
    this.storage.save(this);
  }

  delete(restaurant: Restaurant) {
    this.restaurants = this.restaurants.filter((_restaurant) => _restaurant !== restaurant);
    this.updateComponents();
    this.storage.save(this);
  }

  toggleFavorite(restaurant: Restaurant) {
    restaurant.setFavorite(!restaurant.isFavorite());
    this.updateComponents();
    this.storage.save(this);
  }

  assignId() {
    const ids = new Set(this.restaurants.map((restaurant) => restaurant.getId()));
    do {
      this.restaurantIdCounter += 1;
    } while (ids.has(this.restaurantIdCounter));

    return this.restaurantIdCounter;
  }

  setFilters(filters: RestaurantFilter[]) {
    this.filters = filters;
    this.updateComponents();
  }

  getRestaurants() {
    return this.restaurants;
  }

  getRestaurant(id: Restaurant['id']) {
    return this.restaurants.find((restaurant) => restaurant.getId() === id) ?? null;
  }

  getFilteredRestaurants() {
    return this.filters.reduce(
      (filteredRestaurants, filter) => filter(filteredRestaurants),
      this.restaurants,
    );
  }

  getFavoritedRestaurants() {
    return this.restaurants.filter((restaurant) => restaurant.isFavorite());
  }

  addEventListener(listener: RestaurantsListenerFn) {
    this.#eventListeners.push(listener);
    listener(this);
  }

  dispatchEvent() {
    this.#eventListeners.forEach((listener) => listener(this));
  }

  async updateComponents() {
    await allCustomElementsDefined();

    this.dispatchEvent();
  }
}

export default new Restaurants();
