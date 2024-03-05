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
  addRestaurant: (restaurant: Restaurant, restaurantList: Restaurant[]) => boolean;
  filterByCategory: (category: Category, restaurantList: Restaurant[]) => Restaurant[];
  sortByProperty: (property: Property, restaurantList: Restaurant[]) => Restaurant[];
}

export { Category, Distance, Property, Restaurant, Restaurants };
