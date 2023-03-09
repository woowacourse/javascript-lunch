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
}

export default RestaurantFilter;
