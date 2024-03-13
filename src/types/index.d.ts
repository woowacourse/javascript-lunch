export type Category = '한식' | '중식' | '일식' | '아시안' | '양식' | '기타';

export type All = '전체';

export type Distance = 5 | 10 | 15 | 20 | 30;

export type SortType = 'name' | 'distance';

export type TabValue = 'favorited' | 'all';

export type InvalidResult = {
  targetClassName: string;
  success: boolean;
  errorMessage: string;
};

export interface RestaurantState {
  id: number;
  category: Icategory;
  name: string;
  distance: Idistance;
  description?: string;
  link?: string;
  isFavorited: boolean;
}

export interface RestaurantHelperFunction {
  sortByName: (restaurantList: Irestaurant[]) => Irestaurant[];

  sortByDistance: (restaurantList: Irestaurant[]) => Irestaurant[];

  filterByCategory: (category: Icategory, restaurantList: Irestaurant[]) => Irestaurant[];
}

export interface CategoryInfo {
  alt: string;
  src: string;
}
