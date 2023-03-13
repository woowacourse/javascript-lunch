import RestaurantStorage from './RestaurantStorage';

export type TCategory = '한식' | '중식' | '일식' | '양식' | '아시안' | '기타';

export type TPriority = 'distance' | 'name';

export type TDistance = 5 | 10 | 15 | 20 | 30;

export interface IRestaurant {
  category: TCategory;
  name: string;
  distance: TDistance;
  description?: string;
  link?: string;
}

class RestaurantListItem {
  #list: IRestaurant[] = [];

  #filter = { category: '전체', sort: 'name' };

  constructor(restaurantList: IRestaurant[]) {
    this.#list = restaurantList;
  }

  add(restaurant: IRestaurant) {
    RestaurantStorage.set([restaurant, ...this.#list]);
    this.#list = RestaurantStorage.get();
    return this.#list;
  }

  setFilter(category: TCategory | '전체') {
    this.#filter.category = category;
  }

  setSort(sort: TPriority) {
    this.#filter.sort = sort;
  }

  #categoryFilter() {
    if (this.#filter.category === '전체') return this.#list;

    return this.#list.filter((item) => item.category === this.#filter.category);
  }

  #sortFilter(list: IRestaurant[]) {
    if (this.#filter.sort === 'distance') {
      return this.#sortByDistance(list);
    }

    return this.#sortByName(list);
  }

  #sortByDistance(list: IRestaurant[]) {
    return list.sort((current, next) => {
      return current.distance - next.distance;
    });
  }

  #sortByName(list: IRestaurant[]) {
    return list.sort((current, next) => {
      return current.name > next.name ? 1 : -1;
    });
  }

  filterAndSort() {
    return this.#sortFilter(this.#categoryFilter());
  }

  getListItem() {
    return this.#list;
  }
}

export default RestaurantListItem;
