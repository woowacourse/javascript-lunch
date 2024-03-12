class RestaurantRepository {
  #restaurants;

  constructor() {
    this.#restaurants = this.#getRestaurants();
  }

  #getRestaurants(): IRestaurant[] {
    const restaurants = localStorage.getItem('restaurants');
    return restaurants ? JSON.parse(restaurants) : [];
  }

  #getFilteredByCategory(restaurants: IRestaurant[], category: TAllCategory) {
    return category === '전체' ? restaurants : restaurants.filter((restaurant) => restaurant.category === category);
  }

  #getSortedByName(restaurants: IRestaurant[]) {
    return [...restaurants].sort((a, b) => a.name.localeCompare(b.name));
  }

  #getSortedByDistance(restaurants: IRestaurant[]) {
    return [...restaurants].sort((a, b) => a.distance - b.distance);
  }

  addRestaurant(restaurant: Restaurant) {
    this.#restaurants = [...this.#restaurants, { key: this.#restaurants.length + 1, ...restaurant }];
    localStorage.setItem('restaurants', JSON.stringify(this.#restaurants));
  }

  getRestaurant(key: number) {
    return this.#restaurants.find((restaurant) => restaurant.key === key);
  }

  removeRestaurant(key: number) {
    this.#restaurants = this.#restaurants.slice(key, 1);
    localStorage.setItem('restaurants', JSON.stringify(this.#restaurants));
  }

  transformRestaurants(category: TAllCategory, sortingOption: TSortingOption) {
    const filteredRestaurants = this.#getFilteredByCategory(this.#restaurants, category);
    return sortingOption === '이름순'
      ? this.#getSortedByName(filteredRestaurants)
      : this.#getSortedByDistance(filteredRestaurants);
  }

  toggleFavoriteRestaurant(key: number) {}

  getFavoriteRestaurants() {
    return this.#restaurants.filter((restaurant) => restaurant.isFavorite);
  }
}

export default new RestaurantRepository();
