export type Category = '한식' | '중식' | '일식' | '아시안' | '양식' | '기타';

export type All = '전체';

export type Distance = 5 | 10 | 15 | 20 | 30;

export type SortType = 'name' | 'distance';

// export type MappedType<T> = {
//   [K in keyof T]?: T[K];
// };

export type InvalidResult = {
  targetClassName: string;
  isValid: boolean;
  errorMessage: string;
};

export interface RestaurantState {
  category: Icategory;
  name: string;
  distance: Idistance;
  description?: string;
  link?: string;
}

export interface RestaurantHelperFunction {
  sortByName: (restaurantList: Irestaurant[]) => Irestaurant[];

  sortByDistance: (restaurantList: Irestaurant[]) => Irestaurant[];

  filterByCategory: (category: Icategory, restaurantList: Irestaurant[]) => Irestaurant[];
}

export interface IcategoryInfo {
  category: string;
  categoryImg: string;
}
