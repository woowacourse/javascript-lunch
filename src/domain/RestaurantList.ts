import type { IRestaurantList, TRestaurantInstance, TCategory, TSorting } from '../types/restaurant';

import Restaurant from './Restaurant';
import RestaurantStorage from './RestaurantStorage';
import { STORAGE_KEY } from '../constants/config';
import { ALL, BY_NAME_ASC } from '../constants/filter';

class RestaurantList {
  restaurants: IRestaurantList;

  constructor(restaurants: IRestaurantList) {
    const restaurantsInStorage = RestaurantStorage.get(STORAGE_KEY);
    this.restaurants = restaurantsInStorage.length > 0 ? restaurantsInStorage : restaurants;
    this.restaurants = this.getSortedByName();
    RestaurantStorage.set(this.restaurants);
  }

  getSortedByName(): IRestaurantList {
    return [...this.restaurants].sort((a, b) => (a.information.name > b.information.name ? 1 : -1));
  }

  getSortedByDistance(): IRestaurantList {
    return [...this.restaurants].sort((a, b) => (a.information.distance > b.information.distance ? 1 : -1));
  }

  getSortedByCondition(sortingCondition: TSorting): IRestaurantList {
    return sortingCondition === BY_NAME_ASC ? this.getSortedByName() : this.getSortedByDistance();
  }

  getRestaurantListLength() {
    return this.restaurants.length;
  }

  getFavoriteList() {
    return [...this.restaurants].filter(restaurant => restaurant.information.isFavorite);
  }

  getAllList() {
    return [...this.restaurants];
  }

  add(restaurant: TRestaurantInstance): void {
    const restaurantsInStorage = RestaurantStorage.get(STORAGE_KEY);
    this.restaurants = restaurantsInStorage.length > 0 ? [...restaurantsInStorage, restaurant] : [restaurant];
    RestaurantStorage.set(this.restaurants);
  }

  filterByCategory(category: TCategory): void {
    this.restaurants = RestaurantStorage.get(STORAGE_KEY);
    if (category !== ALL)
      this.restaurants = this.restaurants.filter(restaurant => restaurant.isMatchedCategory(category));
  }

  setFavoriteRestaurantList(targetId: string) {
    // 필터링한 상태에서도 데이터 위치가 변하지 않도록 상태값에서 isFavorite 값만 변경
    this.restaurants = this.restaurants.map(restaurant =>
      restaurant.information.id === targetId
        ? new Restaurant({ ...restaurant.information, isFavorite: !restaurant.information.isFavorite })
        : restaurant,
    );
    // DB에 저장되는 데이터는 전체에서 해당 id를 가진 데이터의 isFavorite 값만 변경
    RestaurantStorage.set(
      RestaurantStorage.get(STORAGE_KEY).map(restaurant =>
        restaurant.information.id === targetId
          ? new Restaurant({ ...restaurant.information, isFavorite: !restaurant.information.isFavorite })
          : restaurant,
      ),
    );
  }

  deleteRestaurant(id: string) {
    this.restaurants = this.restaurants.filter(restaurant => restaurant.information.id !== id);
    RestaurantStorage.set(RestaurantStorage.get(STORAGE_KEY).filter(restaurant => restaurant.information.id !== id));
  }
}

export default RestaurantList;
