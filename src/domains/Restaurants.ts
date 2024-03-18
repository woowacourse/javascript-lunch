import { STORAGE_KEYS, STORAGE_INITIAL_VALUES } from '../constants/rules';
import initialData from '../data/initialData.json';

class Restaurants implements RestaurantsInterface {
  private storage;

  constructor(storage: Storage) {
    this.storage = storage;
    this.initStorage();
  }

  initStorage() {
    if (!this.storage.getItem(STORAGE_KEYS.restaurants)) {
      this.storage.setItem(STORAGE_KEYS.restaurants, JSON.stringify(initialData));
      this.storage.setItem(STORAGE_KEYS.sorting, STORAGE_INITIAL_VALUES.initialSorting);
      this.storage.setItem(STORAGE_KEYS.category, STORAGE_INITIAL_VALUES.initialCategory);
    }
  }

  filterByCategory(category: Category) {
    return this.storageData.filter((restaurant: Restaurant) => restaurant.category === category);
  }

  orderByDistance(restaurants: Restaurant[]) {
    return restaurants.toSorted((prev: Restaurant, next: Restaurant) => {
      const compareWalkingTime = prev.walkingTimeFromCampus - next.walkingTimeFromCampus;
      return compareWalkingTime || prev.name.localeCompare(next.name);
    });
  }

  orderByName(restaurants: Restaurant[]) {
    return restaurants.toSorted((prev: Restaurant, next: Restaurant) =>
      prev.name.localeCompare(next.name),
    );
  }

  sortByStandard(restaurants: Restaurant[], sorting: string) {
    if (sorting === 'distance') return this.orderByDistance(restaurants);
    if (sorting === 'name') return this.orderByName(restaurants);

    return this.storageData;
  }

  addRestaurant(restaurant: Restaurant) {
    this.storage.setItem(
      STORAGE_KEYS.restaurants,
      JSON.stringify([restaurant, ...this.storageData]),
    );
  }

  updateFavoriteStatus(restaurantName: string, isFavorite: boolean) {
    const restaurants = this.storageData.map((restaurant: Restaurant) => {
      if (restaurant.name === restaurantName) {
        return { ...restaurant, isFavorite };
      }
      return restaurant;
    });

    this.storage.setItem(STORAGE_KEYS.restaurants, JSON.stringify(restaurants));
  }

  deleteRestaurant(restaurantName: string) {
    const restaurants = this.storageData.filter(
      (restaurant: Restaurant) => restaurant.name !== restaurantName,
    );
    this.storage.setItem(STORAGE_KEYS.restaurants, JSON.stringify(restaurants));
  }

  get storageData() {
    return JSON.parse(this.storage.getItem(STORAGE_KEYS.restaurants) ?? '[]');
  }

  get standardList() {
    const sorting =
      this.storage.getItem(STORAGE_KEYS.sorting) ?? STORAGE_INITIAL_VALUES.initialSorting;
    const category =
      (this.storage.getItem(STORAGE_KEYS.category) as Category) ??
      STORAGE_INITIAL_VALUES.initialCategory;

    const restaurants: Restaurant[] =
      category === STORAGE_INITIAL_VALUES.initialCategory
        ? this.storageData
        : this.filterByCategory(category);

    return this.sortByStandard(restaurants, sorting);
  }

  get favoriteList() {
    return this.storageData.filter((restaurant: Restaurant) => restaurant.isFavorite);
  }

  set standard(value: { id: string; standard: string }) {
    this.storage.setItem(value.id, value.standard);
  }
}

export default Restaurants;
