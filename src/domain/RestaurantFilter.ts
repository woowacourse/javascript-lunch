import { Restaurant, FilterProperties } from '../type';

class RestaurantFilter {
  filter(restaurants: Restaurant[], filterProperties: FilterProperties) {
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
}

export default RestaurantFilter;
