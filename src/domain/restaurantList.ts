import { RestaurantCardComponent } from '../components/RestaurantCardComponent';
import { initialData } from '../data/restaurantData';
import { RestaurantInfo, CategoryValues, SortingValues } from '../types/types';
import restaurantAPI from './restaurantAPI';

export default class RestaurantList {
  #category: CategoryValues = '전체';
  #sorting: SortingValues = '이름순';

  #restaurantData = initialData;

  private async initialize() {
    const additionalData = await restaurantAPI.load();

    return [...initialData, ...additionalData];
  }

  constructor() {
    this.updateRestaurants();
    this.render();
  }

  setCategory(category: CategoryValues) {
    this.#category = category;

    this.updateRestaurants();
  }

  setSort(sortingKey: SortingValues) {
    this.#sorting = sortingKey;

    this.updateRestaurants();
  }

  async getRestaurants(): Promise<RestaurantInfo[]> {
    this.#restaurantData = await this.initialize();
    return this.#restaurantData;
  }

  async filterByCategory(category: CategoryValues): Promise<RestaurantInfo[]> {
    this.#restaurantData = await this.initialize();

    if (category === '전체') return this.#restaurantData;

    return [...this.#restaurantData].filter((restaurant) => restaurant.category === category);
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

  async updateRestaurants() {
    const filteredData = await this.filterByCategory(this.#category);
    const sortedData = this.sortByKey(filteredData, this.#sorting);

    this.#restaurantData = sortedData;
    this.render();
  }

  render() {
    const $restaurantListContainer = document.querySelector(
      '.restaurant-list-container'
    ) as HTMLElement;

    $restaurantListContainer.replaceChildren();

    this.#restaurantData.forEach(({ category, name, distance, isFavorite, description }) => {
      $restaurantListContainer.appendChild(
        RestaurantCardComponent({ category, name, distance, isFavorite, description }).create()
      );
    });
  }
}
