import fetchRestaurantData from '../../domain/fetchRestaurantListData';
import Category from '../../enums/Category';
import Sorting from '../../enums/Sorting';
import Restaurant from '../../interfaces/Restaurant';
import RestaurantItem from '../RestaurantItem/RestaurantItem';

class RestaurantList {
  #restaurantList: Restaurant[];

  constructor(category: Category | '전체', sort: Sorting) {
    this.#restaurantList = this.getRestaurantListData(category, sort);
    this.create();
  }

  create() {
    const restaurantListContainer = document.querySelector('.restaurant-list-container');
    const restaurantList = document.createElement('ul');
    if (restaurantListContainer) {
      restaurantListContainer.classList.add('restaurant-list-container');
      this.#restaurantList.forEach((restaurant) => {
        RestaurantItem.create(restaurant, restaurantList);
      });
      restaurantListContainer.appendChild(restaurantList);

      const mainElement = document.querySelector('main');
      mainElement?.appendChild(restaurantListContainer);
    }
  }

  getRestaurantListData(category: Category | '전체', sorting: Sorting) {
    const restaurantListData: Restaurant[] = fetchRestaurantData();
    const filteredRestaurantListData = this.filterRestaurantListData(restaurantListData, category);
    const sortedRestaurantListData = this.sortRestaurantListData(filteredRestaurantListData, sorting);
    return sortedRestaurantListData;
  }
  filterRestaurantListData(restaurantListData: Restaurant[], category: Category | '전체') {
    if (category === '전체') {
      return restaurantListData;
    }
    return restaurantListData.filter((restaurant) => restaurant.category === category);
  }

  sortRestaurantListData(filteredRestaurantListData: Restaurant[], sorting: Sorting) {
    switch (sorting) {
      case '이름순':
        return filteredRestaurantListData.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      case '거리순':
        return filteredRestaurantListData.sort((a, b) => {
          return a.distance - b.distance;
        });
      default:
        return filteredRestaurantListData;
    }
  }
}

export default RestaurantList;
