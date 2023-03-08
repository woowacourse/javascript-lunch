import { LOCAL_STORAGE_KEY } from '../constant';
import { Restaurant, UserRestaurantInput } from '../type';
import storage from '../util/storage';

class Restaurants {
  #restaurants: Restaurant[] =
    (storage.getData(LOCAL_STORAGE_KEY) || []).restaurants || [];
  #id: number = (storage.getData(LOCAL_STORAGE_KEY) || []).id || 0;
  #filterBy: string = '전체';
  #sortBy: string = 'name';

  addRestaurant(restaurantInput: UserRestaurantInput) {
    this.#restaurants.push({
      ...restaurantInput,
      isFavorite: false,
      itemId: this.#id,
    });

    this.#id += 1;
  }

  getRestaurants() {
    const filteredRestaurants = this.#getFilteredRestaurantsByCategory(
      [...this.#restaurants],
      this.#filterBy
    );

    const sortedRestaurants =
      this.#sortBy === 'name'
        ? this.#getSortedRestaurantsByName(filteredRestaurants)
        : this.#getSortedRestaurantsByDistanceInMinutes(filteredRestaurants);

    return sortedRestaurants;
  }

  saveRestaurantsToLocalStorage() {
    storage.setData(LOCAL_STORAGE_KEY, {
      restaurants: this.#restaurants,
      id: this.#id,
    });
  }

  setFilterBy(filterBy: string) {
    this.#filterBy = filterBy;
  }

  setSortBy(sortBy: string) {
    this.#sortBy = sortBy;
  }

  toggleFavorite(itemId: number) {
    const searchedIndex = this.#getRestaurantIndexById(itemId);

    if (itemId !== -1) {
      this.#restaurants[searchedIndex].isFavorite
        ? (this.#restaurants[searchedIndex].isFavorite = false)
        : (this.#restaurants[searchedIndex].isFavorite = true);
    }
  }

  getRestaurantById(itemId: number) {
    const searchedIndex = this.#getRestaurantIndexById(itemId);

    if (searchedIndex === -1) {
      throw Error(
        '데이터를 불러오는 중 오류가 발생했습니다. 페이지를 새로고침 해 주세요.'
      );
    }

    return this.#restaurants[searchedIndex];
  }

  #getSortedRestaurantsByName(restaurants: Restaurant[]) {
    return [...restaurants].sort((x, y) => x.name.localeCompare(y.name));
  }

  #getSortedRestaurantsByDistanceInMinutes(restaurants: Restaurant[]) {
    return [...restaurants].sort(
      (x, y) => Number(x.distanceInMinutes) - Number(y.distanceInMinutes)
    );
  }

  #getFilteredRestaurantsByCategory(
    restaurants: Restaurant[],
    category: string
  ) {
    if (category === '전체') {
      return restaurants;
    }

    return [...restaurants].filter(
      (restaurant) => restaurant.category === category
    );
  }

  #getRestaurantIndexById(itemId: number) {
    let searchedIndex = -1;

    this.#restaurants.forEach((restaurant, index) => {
      if (restaurant.itemId === itemId) {
        searchedIndex = index;
      }
    });

    return searchedIndex;
  }
}

export default Restaurants;
