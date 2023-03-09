import { Restaurant, FilterProperties } from '../type';

class RestaurantSearcher {
  /**
   * 요청한 필터링 옵션이 즐겨찾기한 레스토랑일 경우 즐겨찾기된 레스토랑을 반환하고,
   * 그렇지 않을 경우에는 카테고리/정렬 옵션으로 필터링한 레스토랑을 반환합니다.
   *
   * @param restaurants - 검색을 실행할 레스토랑 목록
   * @param filterProperties - 필터링 옵션
   * @returns
   */
  search(restaurants: Restaurant[], filterProperties: FilterProperties) {
    if (filterProperties.favoriteBy === 'favorite') {
      return this.#getFavoriteRestaurants(restaurants);
    }

    const filteredRestaurants = this.#getFilteredRestaurantsByCategory(
      restaurants,
      filterProperties.filterBy
    );

    const sortedRestaurants = this.#getSortedRestaurants(
      filteredRestaurants,
      filterProperties.sortBy
    );

    return sortedRestaurants;
  }

  #getFavoriteRestaurants(restaurants: Restaurant[]) {
    return [...restaurants].filter(
      (restaurant) => restaurant.isFavorite === true
    );
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
}

export default RestaurantSearcher;
