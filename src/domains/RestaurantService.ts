import { CategoryOptions, Restaurant, RestaurantFilter } from '../types/types';

class RestaurantService {
  private restaurantList: Restaurant[];

  constructor(restaurantList: Restaurant[]) {
    this.restaurantList = restaurantList;
  }

  add(restaurant: Restaurant) {
    restaurant.id = this.restaurantList[this.restaurantList.length - 1].id + 1;
    this.restaurantList.push({ ...restaurant });
  }

  delete(restaurantId: number) {
    const restaurantIndex = this.findRestaurantIndex(restaurantId);
    this.restaurantList.splice(restaurantIndex, 1);

    return [...this.restaurantList];
  }

  findRestaurantIndex(restaurantId: number) {
    return this.restaurantList.findIndex((restaurant) => restaurant.id === restaurantId);
  }

  getFavoriteRestaurantList() {
    return this.restaurantList.filter((restaurant) => restaurant.favorite);
  }

  getRestaurant(restaurantId: number) {
    return this.restaurantList.find((restaurant) => restaurant.id === restaurantId) as Restaurant;
  }

  filter(category: CategoryOptions, restaurantList: Restaurant[]) {
    if (category === '전체') return [...restaurantList];

    return restaurantList.filter((restaurant) => restaurant.category === category);
  }

  sortByName(restaurantList: Restaurant[]) {
    return [...restaurantList].sort((a, b) => a.name.localeCompare(b.name));
  }

  sortByDistance(restaurantList: Restaurant[]) {
    return [...restaurantList].sort((a, b) => a.distance - b.distance);
  }

  filterAndSort(
    displayStatus: RestaurantFilter,
    restaurantList: Restaurant[] = this.restaurantList
  ) {
    const filteredRestaurantList = this.filter(displayStatus.category, restaurantList);

    if (displayStatus.sorting === '이름순') {
      return this.sortByName(filteredRestaurantList);
    }

    return this.sortByDistance(filteredRestaurantList);
  }

  updateFavorite(restaurantId: number) {
    const restaurantIndex = this.findRestaurantIndex(restaurantId);
    this.restaurantList[restaurantIndex].favorite = !this.restaurantList[restaurantIndex].favorite;

    return [...this.restaurantList];
  }
}

export default RestaurantService;
