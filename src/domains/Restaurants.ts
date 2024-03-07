import initialData from '../data/initialData.json';
import { RestaurantsValidator } from '../validators';

class Restaurants implements RestaurantsInterface {
  private storage;

  constructor(storage: Storage) {
    this.storage = storage;
    this.initStorage();
  }

  initStorage() {
    if (!this.storage.getItem('restaurants')) {
      this.storage.setItem('restaurants', JSON.stringify(initialData));
    }
  }

  get getStorageData() {
    return JSON.parse(this.storage.getItem('restaurants') || '{}');
  }

  filterByCategory(category: Category) {
    return this.getStorageData.filter((restaurant: Restaurant) => restaurant.category === category);
  }

  addRestaurant(restaurant: Restaurant) {
    try {
      const restaurantsNames = this.getStorageData.map(({ name }: Restaurant) => name);
      RestaurantsValidator(restaurantsNames, restaurant.name);
      this.storage.setItem('restaurants', JSON.stringify([restaurant, ...this.getStorageData]));
    } catch (error) {
      console.log(this.handleCatchError(error));
    }
  }

  orderByDistance() {
    return this.getStorageData.toSorted((prev: Restaurant, next: Restaurant) => {
      const compareWalkingTime = prev.walkingTimeFromCampus - next.walkingTimeFromCampus;
      return compareWalkingTime || prev.name.localeCompare(next.name);
    });
  }

  orderByName() {
    return this.getStorageData.toSorted((prev: Restaurant, next: Restaurant) =>
      prev.name.localeCompare(next.name),
    );
  }

  private handleCatchError(error: unknown) {
    if (error instanceof Error) return error.message;
  }
}

export default Restaurants;
