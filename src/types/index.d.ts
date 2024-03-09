export type Icategory = '한식' | '중식' | '일식' | '아시안' | '양식' | '기타';

export type Iall = '전체';

export type Idistance = 5 | 10 | 15 | 20 | 30;

export type IsortType = 'name' | 'distance';

export type MappedType<T> = {
  [K in keyof T]?: T[K];
};

export type IinvalidResult = {
  targetClassName: string;
  isValid: boolean;
  errorMessage: string;
};

export interface Irestaurant {
  category: Icategory;
  name: string;
  distance: Idistance;
  description?: string;
  link?: string;
}

export interface IrestaurantList {
  sortByName: (restaurantList: Irestaurant[]) => Irestaurant[];

  sortByDistance: (restaurantList: Irestaurant[]) => Irestaurant[];

  filterByCategory: (category: Icategory, restaurantList: Irestaurant[]) => Irestaurant[];
}

export interface IcategoryInfo {
  category: string;
  categoryImg: string;
}
