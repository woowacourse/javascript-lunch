import { allCustomElementsDefined } from '@/components/lifecycles';
import type RestaurantDetailModal from '@/components/restaurant/modal/RestaurantDetailModal';
import type RestaurantList from '@/components/restaurant/RestaurantList';
import type { RestaurantProps } from '@/domain/Restaurant';
import Restaurant from '@/domain/Restaurant';
import type { RestaurantFilter } from '@/domain/RestaurantFilter';
import { DEFAULT_RESTAURANTS } from '@/fixtures';
import type { IStorage } from '@/storage/IStorage';
import RestaurantsJSONParser from '@/storage/parsers/RestaurantsJSONParser';
import RestaurantsLocalStorage from '@/storage/RestaurantsLocalStorage';

export interface RestaurantsState {
  restaurantIdCounter: number;

  restaurants: Restaurant[];
}

export class Restaurants implements RestaurantsState {
  filters: RestaurantFilter[] = [];

  restaurantIdCounter;

  restaurants: Restaurant[];

  private readonly parser = new RestaurantsJSONParser();

  private readonly storage: IStorage<RestaurantsState> = new RestaurantsLocalStorage(this.parser, {
    restaurantIdCounter: 1,
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
    const id = this.restaurantIdCounter;
    this.restaurantIdCounter += 1;
    return String(id);
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

  async updateComponents() {
    await allCustomElementsDefined();

    document
      .querySelector<RestaurantList>('[slot="all"] r-restaurant-list')
      ?.setRestaurants(this.getFilteredRestaurants());

    document
      .querySelector<RestaurantList>('[slot="favorite"] r-restaurant-list')
      ?.setRestaurants(this.getFavoritedRestaurants());

    document.querySelector<RestaurantDetailModal>('r-restaurant-detail-modal')?.renderContent();
  }
}

export default new Restaurants();
