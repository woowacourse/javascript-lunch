type Category = '한식' | '중식' | '일식' | '아시안' | '양식' | '기타';

type Distance = 5 | 10 | 15 | 20 | 30;

type FilteringCategory = '전체' | Category;

type SortingProperty = 'name' | 'distance';

interface Restaurant {
  id: number;
  category: Category;
  name: string;
  distance: Distance;
  description?: string;
  link?: string;
  favorite: boolean;
}

interface Restaurants {
  addRestaurant: (restaurant: Restaurant, restaurantList: Restaurant[]) => boolean;
  removeRestaurant: (restaurant: Restaurant, restaurantList: Restaurant[]) => Restaurant[];
  filterByCategory: (category: Category, restaurantList: Restaurant[]) => Restaurant[];
  sortByProperty: (property: SortingProperty, restaurantList: Restaurant[]) => Restaurant[];
  filterByFavorite: (restaurantList: Restaurant[]) => Restaurant[];
  changeFavorite: (restaurantId: number, restaurantList: Restaurant[]) => boolean;
}

export { Category, Distance, FilteringCategory, SortingProperty, Restaurant, Restaurants };
