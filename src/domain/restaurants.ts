type Category = '한식' | '중식' | '일식' | '아시안' | '양식' | '기타';
type Distance = 5 | 10 | 15 | 20 | 30;

type Restaurant = {
  category: Category;
  name: string;
  distance: Distance;
  description: string;
  link: string;
};

interface Restaurants {
  list: Restaurant[];
  add(restaurant: Restaurant): void;
  filterByCategory(category: Category): Restaurant[];
}

export const restaurants: Restaurants = {
  list: [],

  add(restaurant) {
    this.list = [...this.list, restaurant];
  },
};
