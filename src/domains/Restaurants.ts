import initialData from '../data/initialData.json';

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
    // TODO: 이 값이 있는지 없는지 -> set 고려

    this.storage.setItem('restaurants', JSON.stringify(restaurant));
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
}

export default Restaurants;
