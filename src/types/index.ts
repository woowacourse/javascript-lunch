import { CATEGORY } from '../constants';

export type DefaultBtnColor = 'red' | 'white';

export type BtnType = 'submit' | 'reset' | 'button';

// restaurant
export type Category = keyof typeof CATEGORY;

export type Distance = 5 | 10 | 15 | 20 | 30;
export interface RestaurantInfo {
  category: Category;
  name: string;
  distance: Distance;
  description?: string;
  link?: string;
  like?: boolean;
}

export type RestaurantInfoKey = keyof RestaurantInfo;

// dropbox
export type DropBoxName =
  | 'filteringSorting'
  | 'filteringCategory'
  | 'category'
  | 'distance';

export interface SelectProps {
  name?: string;
  id: string;
  class?: string;
  required: boolean;
}

export interface OptionProps {
  value: string;
  text: string;
  hidden?: boolean;
}

export interface DropBoxMapValue {
  selectProps: SelectProps;
  labelText: string;
  options: OptionProps[];
}

// attributes
export interface Attributes {
  [key: string]: string | null;
}
