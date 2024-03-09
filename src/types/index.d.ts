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

type Option = {
  text: string;
  value: string;
};

export type SelectPropsType = {
  options: Option[];
  className?: string;
  id?: string;
  name: string;
  defaultValue?: string;
};

export type SelectElementDataType = {
  UI_OPTIONS: Option[];
  TAG_CLASS_NAME: string;
  TAG_ID: string;
  TAG_NAME: string;
};

export type SelectElementPropsType = {
  [K in keyof SelectProps]?: SelectProps[K];
};

export type OptionElementPropsType = {
  select: HTMLSelectElement;
  options: Option[];
  defaultValue?: string;
};
