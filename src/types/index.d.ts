export type Category = '한식' | '중식' | '일식' | '아시안' | '양식' | '기타';

export type All = '전체';

export type Distance = 5 | 10 | 15 | 20 | 30;

export type SortType = 'name' | 'distance';

export type TabValue = 'favorite' | 'all';

export type InvalidResult = {
  targetClassName: string;
  success: boolean;
  errorMessage: string;
};

export interface RestaurantState {
  id: number;
  category: Category;
  name: string;
  distance: Distance;
  description?: string;
  link?: string;
  isFavorited: boolean;
}

export interface RestaurantHelperFunction {
  sortByName: (restaurantList: RestaurantState[]) => RestaurantState[];

  sortByDistance: (restaurantList: RestaurantState[]) => RestaurantState[];

  filterByCategory: (category: Category, restaurantList: RestaurantState[]) => RestaurantState[];
}

export interface CategoryInfo {
  alt: string;
  src: string;
}
