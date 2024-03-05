type Category = '한식' | '중식' | '일식' | '아시안' | '양식' | '기타';

type Distance = 5 | 10 | 15 | 20 | 30;

type Property = 'name' | 'distance';

interface Restaurant {
  category: Category;
  name: string;
  distance: Distance;
  description?: string;
  link?: string;
}

interface Restaurants {
  restaurants: Restaurant[];
  addRestaurant: (restaurant: Restaurant) => boolean;
  filterByCategory: (category: Category) => Restaurant[];
  sortByProperty: (property: Property) => Restaurant[];
}
