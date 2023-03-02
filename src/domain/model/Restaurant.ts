type Category = '한식' | '중식' | '일식' | '아시안' | '양식' | '기타';

type Distance = 5 | 10 | 15 | 20 | 30;

export interface RestaurantInfo {
  category: Category;
  name: string;
  distance: Distance;
  description?: string;
  link?: string;
}

class Restaurant {
  #category: Category;

  #name: string;

  #distance: Distance;

  #description?: string;

  #link?: string;

  constructor({
    category,
    name,
    distance,
    description = '',
    link = '',
  }: RestaurantInfo) {
    this.#category = category;
    this.#name = name;
    this.#distance = distance;
    this.#description = description;
    this.#link = link;
  }

  getInfo() {
    return {
      category: this.#category,
      name: this.#name,
      description: this.#description,
      distance: this.#distance,
      link: this.#link,
    };
  }
}

export default Restaurant;
