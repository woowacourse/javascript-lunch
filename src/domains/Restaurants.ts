import { STORAGE } from '../constants/rules';
import initialData from '../data/initialData.json';

class Restaurants implements RestaurantsInterface {
  private storage;

  constructor(storage: Storage) {
    this.storage = storage;
    this.initStorage();
  }

  initStorage() {
    if (!this.storage.getItem(STORAGE.restaurants)) {
      this.storage.setItem(STORAGE.restaurants, JSON.stringify(initialData));
      this.storage.setItem(STORAGE.sorting, STORAGE.initialSorting);
      this.storage.setItem(STORAGE.category, STORAGE.initialCategory);
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
    this.storage.setItem(STORAGE.restaurants, JSON.stringify([restaurant, ...this.storageData]));
  }

  updateFavoriteStatus(restaurantName: string, isFavorite: boolean) {
    const restaurants = this.storageData.map((restaurant: Restaurant) => {
      if (restaurant.name === restaurantName) {
        return { ...restaurant, isFavorite };
      }
      return restaurant;
    });

    this.storage.setItem(STORAGE.restaurants, JSON.stringify(restaurants));
  }

  get storageData() {
    return JSON.parse(this.storage.getItem(STORAGE.restaurants) ?? '[]');
  }

  get standardList() {
    const sorting = this.storage.getItem(STORAGE.sorting) ?? STORAGE.initialSorting;
    const category =
      (this.storage.getItem(STORAGE.category) as Category) ?? STORAGE.initialCategory;

    const restaurants: Restaurant[] =
      category === STORAGE.initialCategory ? this.storageData : this.filterByCategory(category);

    return this.sortByStandard(restaurants, sorting);
  }

  set standard(value: { id: string; standard: string }) {
    this.storage.setItem(value.id, value.standard);
  }
}

export default Restaurants;
