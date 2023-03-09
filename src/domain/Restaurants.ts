import { LOCAL_STORAGE_KEY } from '../constant';
import { Restaurant, UserRestaurantInput } from '../type';
import RestaurantSearcher from './RestaurantSearcher';
import storage from '../util/storage';

class Restaurants {
  #restaurants: Restaurant[] =
    (storage.getData(LOCAL_STORAGE_KEY) || []).restaurants || [];
  #id: number = (storage.getData(LOCAL_STORAGE_KEY) || []).id || 0;
  #restaurantSearcher = new RestaurantSearcher();
  #filterProperties = { filterBy: '전체', sortBy: 'name', favoriteBy: 'all' };

  addRestaurant(restaurantInput: UserRestaurantInput) {
    this.#restaurants.push({
      ...restaurantInput,
      isFavorite: false,
      itemId: this.#id,
      link: this.#trimLink(restaurantInput.link),
    });

    this.#id += 1;
  }

  getRestaurants() {
    return this.#restaurantSearcher.search(
      this.#restaurants,
      this.#filterProperties
    );
  }

  saveRestaurantsToLocalStorage() {
    storage.setData(LOCAL_STORAGE_KEY, {
      restaurants: this.#restaurants,
      id: this.#id,
    });
  }

  setFilterBy(filterBy: string) {
    this.#filterProperties.filterBy = filterBy;
  }

  setSortBy(sortBy: string) {
    this.#filterProperties.sortBy = sortBy;
  }

  setFavoriteBy(favoriteBy: string) {
    this.#filterProperties.favoriteBy = favoriteBy;
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

  deleteRestaurantById(itemId: number) {
    const searchedIndex = this.#getRestaurantIndexById(itemId);

    if (searchedIndex !== -1) {
      this.#restaurants.splice(searchedIndex, 1);
    }
  }

  #trimLink(link: string) {
    return `${
      link.startsWith('https://') || link.startsWith('http://')
        ? ''
        : 'https://'
    }${link}`;
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
