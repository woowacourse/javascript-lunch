import {
  ActiveTab,
  FilteringCategory,
  Restaurant,
  Restaurants,
  SortingProperty,
} from '../../interface/RestaurantInterfaces';
import RestaurantStore from './RestaurantStore';

class RestaurantService implements Restaurants {
  #restaurantList: Restaurant[];

  constructor() {
    this.#restaurantList = RestaurantStore.fetch();
  }

  isExistingRestaurant(restaurant: Restaurant) {
    if (this.#restaurantList.find(item => item.category === restaurant.category && item.name === restaurant.name))
      return true;
    return false;
  }

  addRestaurant(restaurant: Restaurant) {
    this.#restaurantList.push(restaurant);
    RestaurantStore.store(this.#restaurantList);
  }

  deleteRestaurant(deleteID: string) {
    this.#restaurantList = [...this.#restaurantList].filter(restaurant => {
      return restaurant.id !== deleteID;
    });

    RestaurantStore.store(this.#restaurantList);
  }

  filterByCategory(category: FilteringCategory, restaurantList: Restaurant[]) {
    if (category === '전체') return restaurantList;
    return restaurantList.filter(restaurant => restaurant.category === category);
  }

  sortByProperty(property: SortingProperty, restaurantList: Restaurant[]) {
    return restaurantList.sort((first, second) => {
      if (first[property] === second[property]) return first.id > second.id ? 1 : -1;
      else return first[property] > second[property] ? 1 : -1;
    });
  }

  filterFavorite(restaurantList: Restaurant[]) {
    return restaurantList.filter(restaurant => restaurant.isFavorite);
  }

  updateFavoriteState(restaurantId: string) {
    const target = this.#restaurantList.find(restaurant => restaurant.id === restaurantId);
    if (!target) return;
    target.isFavorite = !target.isFavorite;
    RestaurantStore.store(this.#restaurantList);
  }

  generateRenderingList(activeTab: ActiveTab, filteringCategory: FilteringCategory, sortingProperty: SortingProperty) {
    const filteredItems = this.filterByCategory(filteringCategory, this.#restaurantList);
    const sortedItems = this.sortByProperty(sortingProperty, filteredItems);

    if (activeTab === 'favorite') {
      return this.filterFavorite(sortedItems);
    }
    return sortedItems;
  }
}

export default RestaurantService;
