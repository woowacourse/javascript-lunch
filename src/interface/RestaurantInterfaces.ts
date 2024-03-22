type Category = '한식' | '중식' | '일식' | '아시안' | '양식' | '기타';

type FilteringCategory = '전체' | Category;

type SortingProperty = 'name' | 'distance';

interface Restaurant {
  id: string;
  category: Category;
  name: string;
  distance: number;
  description?: string;
  link?: string;
  isFavorite: boolean;
}

interface Restaurants {
  createRestaurant: () => Restaurant;
  addRestaurant: (restaurant: Restaurant, restaurantList: Restaurant[]) => boolean;
  deleteRestaurant: (deleteID: string, restaurantList: Restaurant[]) => Restaurant[];
  filterByCategory: (category: Category, restaurantList: Restaurant[]) => Restaurant[];
  sortByProperty: (property: SortingProperty, restaurantList: Restaurant[]) => Restaurant[];
  filterFavorite: (restaurantList: Restaurant[]) => Restaurant[];
}

export { Category, FilteringCategory, SortingProperty, Restaurant, Restaurants };
