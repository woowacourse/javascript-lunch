type Category = '한식' | '중식' | '일식' | '아시안' | '양식' | '기타';

type Distance = 5 | 10 | 15 | 20 | 30;

export type CategoryAll = '전체' | Category;

export type SortTypeAll = 'name' | 'distance';

export interface Restaurant {
  category: Category;
  name: string;
  distance: Distance;
  description?: string;
  link?: string;
}

class RestaurantList {
  #list: Restaurant[] = [];

  add(restaurant: Restaurant): void {
    this.#list.push(restaurant);
  }

  static filterByCategory(restaurantList: Restaurant[], category: CategoryAll) {
    return restaurantList.filter(
      (restaurant) => restaurant.category === category
    );
  }

  getList(category: CategoryAll, type: SortTypeAll): Restaurant[] {
    if (category === '전체') {
      return RestaurantList.sortByType(this.#list, type);
    }
    const filteredCategory = RestaurantList.filterByCategory(
      this.#list,
      category
    );
    return RestaurantList.sortByType(filteredCategory, type);
  }

  static sortByType(restaurantList: Restaurant[], type: SortTypeAll) {
    if (type === 'distance') {
      return [...restaurantList].sort(
        (aRestaurant, bRestaurant) =>
          aRestaurant.distance - bRestaurant.distance
      );
    }

    return [...restaurantList].sort((aRestaurant, bRestaurant) => {
      return aRestaurant.name.localeCompare(bRestaurant.name);
    });
  }
}

export default RestaurantList;
