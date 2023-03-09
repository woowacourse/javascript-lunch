import { Restaurant, FilterProperties } from '../type';

class RestaurantSearcher {
  search(restaurants: Restaurant[], filterProperties: FilterProperties) {
    const filteredRestaurants = this.#getFilteredRestaurantsByCategory(
      restaurants,
      filterProperties.filterBy
    );

    const sortedRestaurants = this.#getSortedRestaurants(
      filteredRestaurants,
      filterProperties.sortBy
    );

    const favoritedRestaurants = this.#getFavoritedRestaurants(
      sortedRestaurants,
      filterProperties.favoriteBy
    );

    return favoritedRestaurants;
  }

  #getFilteredRestaurantsByCategory(
    restaurants: Restaurant[],
    category: string
  ) {
    return category === '전체'
      ? restaurants
      : [...restaurants].filter(
          (restaurant) => restaurant.category === category
        );
  }

  #getSortedRestaurants(restaurants: Restaurant[], sortBy: string) {
    return sortBy === 'name'
      ? [...restaurants].sort((x, y) => x.name.localeCompare(y.name))
      : [...restaurants].sort(
          (x, y) => Number(x.distanceInMinutes) - Number(y.distanceInMinutes)
        );
  }

  #getFavoritedRestaurants(restaurants: Restaurant[], favoriteBy: string) {
    return favoriteBy === 'all'
      ? restaurants
      : [...restaurants].filter((restaurant) => restaurant.isFavorite === true);
  }
}

export default RestaurantSearcher;
