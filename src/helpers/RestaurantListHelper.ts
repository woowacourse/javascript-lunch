import { All, Category, RestaurantHelperFunction, RestaurantState, SortType } from '../types';

class RestaurantListHelper implements RestaurantHelperFunction {
  sortBySelectedValue(seletedValue: SortType, restaurantList: RestaurantState[]) {
    if (seletedValue === 'name') return this.sortByName(restaurantList);

    return this.sortByDistance(restaurantList);
  }

  sortByName(restaurantList: RestaurantState[]) {
    return restaurantList.sort((a, b) => a.name.localeCompare(b.name));
  }

  sortByDistance(restaurantList: RestaurantState[]) {
    return restaurantList.sort((a, b) => {
      if (a.distance === b.distance) {
        return a.name.localeCompare(b.name);
      }
      return a.distance - b.distance;
    });
  }

  filterByCategory(category: Category | All, restaurantList: RestaurantState[]) {
    if (category === '전체') {
      return restaurantList;
    }

    return restaurantList.filter((restaurant) => restaurant.category === category);
  }
}

const restaurantListHelper = new RestaurantListHelper();

export default restaurantListHelper;
