import { RestaurantCard } from '../components';
import { initialData } from '../data/restaurantData';
import { RestaurantInfo, CategoryValues, SortingValues } from '../types';
import restaurantAPI from './restaurantAPI';

export default class RestaurantList {
  #category: CategoryValues;
  #sorting: SortingValues;
  #isFavorite: boolean;

  #restaurantData = initialData;

  async initialize() {
    const additionalData = await restaurantAPI.load();

    return additionalData;
  }

  constructor() {
    console.log('생성자');
    restaurantAPI.initialize();
    this.updateRestaurants();
    this.render();

    this.#category = '전체';
    this.#sorting = '이름순';
    this.#isFavorite = false;
  }

  setCategory(category: CategoryValues) {
    this.#category = category;

    this.updateRestaurants();
  }

  setSort(sortingKey: SortingValues) {
    this.#sorting = sortingKey;

    this.updateRestaurants();
  }

  setIsFavorite(isFavorite: boolean) {
    this.#isFavorite = isFavorite;

    this.updateRestaurants();
  }

  async getRestaurants(): Promise<RestaurantInfo[]> {
    this.#restaurantData = await this.initialize();
    return this.#restaurantData;
  }

  // async filterByCategory(category: CategoryValues): Promise<RestaurantInfo[]> {
  //   this.#restaurantData = await this.initialize();

  //   if (category === '전체') return this.#restaurantData;

  //   return [...this.#restaurantData].filter((restaurant) => restaurant.category === category);
  // }

  filterByCategory(category: CategoryValues): RestaurantInfo[] {
    if (category === '전체') return this.#restaurantData;

    return [...this.#restaurantData].filter((restaurant) => restaurant.category === category);
  }

  sortFavorite(data: RestaurantInfo[], isFavorite: boolean): RestaurantInfo[] {
    if (!isFavorite) {
      return data;
    }
    return data.filter((restaurant) => restaurant.isFavorite);
  }

  sortByKey(data: RestaurantInfo[], sorting: SortingValues): RestaurantInfo[] {
    const result = data.slice().sort((a, b) => {
      if (sorting === '이름순') {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      }
      if (sorting === '거리순') {
        return a.distance - b.distance;
      }

      return 0;
    });

    return result;
  }

  // async updateRestaurants() {
  //   const filteredData = await this.filterByCategory(this.#category);
  //   const sortByIsFavorite = this.sortFavorite(filteredData, this.#isFavorite);
  //   const sortedData = this.sortByKey(sortByIsFavorite, this.#sorting);

  //   this.#restaurantData = sortedData;
  //   this.render();
  // }

  async updateRestaurants() {
    this.#restaurantData = await this.initialize();
    const filteredData = this.filterByCategory(this.#category);
    const sortByIsFavorite = this.sortFavorite(filteredData, this.#isFavorite);
    const sortedData = this.sortByKey(sortByIsFavorite, this.#sorting);
    console.log(' list 현제 페이지 상태 2,', this.#category, this.#isFavorite, this.#sorting);
    this.#restaurantData = sortedData;
    await this.render();
  }

  async render() {
    const { default: RestaurantCard } = await import('../components/RestaurantCard');
    const $restaurantListContainer = document.querySelector(
      '.restaurant-list-container'
    ) as HTMLElement;

    $restaurantListContainer.replaceChildren();

    this.#restaurantData.forEach((restaurantInfo) => {
      $restaurantListContainer.appendChild(
        RestaurantCard({ restaurantInfo, restaurantList: this }).create()
      );
    });
  }
}

export const restaurantList = new RestaurantList();
