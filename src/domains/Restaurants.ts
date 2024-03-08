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
      this.storage.setItem('sorting-filter', 'name');
      this.storage.setItem('category-filter', '전체');
    }
  }

  filterByCategory(category: Category) {
    return this.storageData.filter((restaurant: Restaurant) => restaurant.category === category);
  }

  addRestaurant(restaurant: Restaurant) {
    this.storage.setItem('restaurants', JSON.stringify([restaurant, ...this.storageData]));
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
    if (sorting && sorting === 'distance') return this.orderByDistance(restaurants);
    if (sorting && sorting === 'name') return this.orderByName(restaurants);

    return this.storageData;
  }

  get storageData() {
    return JSON.parse(this.storage.getItem('restaurants') || '{}');
  }

  get standardList() {
    const sorting: string | null = this.storage.getItem('sorting-filter') || '이름순';
    const category: Category | null = this.storage.getItem('category-filter') as Category;

    const restaurants: Restaurant[] =
      category === '전체' ? this.storageData : this.filterByCategory(category);

    return this.sortByStandard(restaurants, sorting);
  }

  set standard(value: { id: string; standard: string }) {
    this.storage.setItem(value.id, value.standard);
  }
}

export default Restaurants;
