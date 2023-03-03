type Category = '한식' | '중식' | '일식' | '아시안' | '양식' | '기타';

export type CategoryAll = 'all' & Category;

export type SortTypeAll = 'name' | 'distance';

type Distance = 5 | 10 | 15 | 20 | 30;

export interface RestaurantInfo {
  category: Category;
  name: string;
  distance: Distance;
  description?: string;
  link?: string;
}

class Restaurant {
  #information: RestaurantInfo;

  constructor({
    category,
    name,
    distance,
    description = '',
    link = '',
  }: RestaurantInfo) {
    this.#information = {
      category,
      name,
      distance,
      description,
      link,
    };
  }

  getInfo() {
    return this.#information;
  }
}

export default Restaurant;
