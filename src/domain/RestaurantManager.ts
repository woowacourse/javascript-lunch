type Category = '한식' | '중식' | '일식' | '아시안' | '양식' | '기타' | '전체';

type Option = 'name' | 'distance';

interface Restaurant {
  category: Category;
  name: string;
  distance: 5 | 10 | 15 | 20 | 30;
  description?: string;
  link?: string;
  favorite?: boolean;
}

class RestaurantManager {
  #restaurants: Restaurant[] = [];

  get restaurants(): Restaurant[] {
    return [...this.#restaurants];
  }

  set restaurants(restaurants: Restaurant[]) {
    this.#restaurants = restaurants ?? [];
  }

  add(restaurant: Restaurant): void {
    this.#restaurants.push(restaurant);
  }

  filteredAndSortedByOptions(category: Category, option: Option): Restaurant[] {
    const filteredRestaurant = this.#filterByCategory(category);

    if (option === 'distance') return this.#sortByDistance(filteredRestaurant);

    return this.#sortByName(filteredRestaurant);
  }

  #filterByCategory(category: Category): Restaurant[] {
    if (category === '전체') return this.restaurants;

    return this.#restaurants.filter((restaurant) => restaurant.category === category);
  }

  #sortByName(restaurants: Restaurant[]): Restaurant[] {
    return [...restaurants].sort((a, b) => a.name.localeCompare(b.name));
  }

  #sortByDistance(restaurants: Restaurant[]): Restaurant[] {
    return [...restaurants].sort((a, b) => a.distance - b.distance);
  }

  toggleFavorite(restaurantName: string): void {
    const restaurantIndex = this.#restaurants.findIndex((restaurant) => restaurant.name === restaurantName);
    if (restaurantIndex !== -1) {
      this.#restaurants[restaurantIndex].favorite = !this.#restaurants[restaurantIndex].favorite;
      this.updateLocalStorage();
    }
  }

  updateLocalStorage(): void {
    localStorage.setItem('restaurants', JSON.stringify(this.#restaurants));
  }

  loadRestaurantsFromLocalStorage() {
    const storedRestaurants = localStorage.getItem('restaurants');
    if (storedRestaurants) {
      this.#restaurants = JSON.parse(storedRestaurants);
    }
  }
}

export default RestaurantManager;
