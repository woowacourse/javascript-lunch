import { allCustomElementsDefined } from '../components/lifecycles';
import type RestaurantDetailModal from '../components/restaurant/modal/RestaurantDetailModal';
import type RestaurantList from '../components/restaurant/RestaurantList';
import type { RestaurantProps } from '../domain/Restaurant';
import Restaurant from '../domain/Restaurant';
import type { RestaurantFilter } from '../domain/RestaurantFilter';
import { DEFAULT_RESTAURANTS } from '../fixtures';

class Restaurants {
  filters: RestaurantFilter[] = [];

  restaurantIdCounter = 1;

  restaurants: Restaurant[] = DEFAULT_RESTAURANTS.map((createFn) => createFn(this.assignId()));

  constructor() {
    this.load();
  }

  load() {
    const serializedRestaurantIdCounter = localStorage.getItem('restaurantIdCounter');
    if (serializedRestaurantIdCounter) {
      this.restaurantIdCounter = JSON.parse(serializedRestaurantIdCounter);
    }

    const serializedRestaurantObjects = localStorage.getItem('restaurants');
    if (serializedRestaurantObjects) {
      const restaurantObjects: unknown[] = JSON.parse(serializedRestaurantObjects);
      this.restaurants = restaurantObjects.map((restaurantObject) => {
        return Object.setPrototypeOf(restaurantObject, Restaurant.prototype);
      });
    }
    this.updateComponents();
  }

  save() {
    localStorage.setItem('restaurantIdCounter', JSON.stringify(this.restaurantIdCounter));
    localStorage.setItem('restaurants', JSON.stringify(this.restaurants));
  }

  create(restaurantProps: Omit<RestaurantProps, 'id'>) {
    const restaurant = new Restaurant({
      id: this.assignId(),
      ...restaurantProps,
    });
    this.restaurants.push(restaurant);
    this.updateComponents();
    this.save();
  }

  delete(restaurant: Restaurant) {
    this.restaurants = this.restaurants.filter((_restaurant) => _restaurant !== restaurant);
    this.updateComponents();
    this.save();
  }

  toggleFavorite(restaurant: Restaurant) {
    restaurant.setFavorite(!restaurant.isFavorite());
    this.updateComponents();
    this.save();
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
