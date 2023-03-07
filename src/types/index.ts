export type Category = '한식' | '중식' | '일식' | '아시안' | '양식' | '기타';
export type Distance = '5' | '10' | '15' | '20' | '30';
export type RestaurantSortType = 'name' | 'distance';

export interface IRestaurant {
  category: Category;
  name: string;
  distance: Distance;
  description?: string;
  link?: string;
}

export type SelectBoxConfig = {
  attribute: {
    name: string;
    id: string;
    class: string;
    isRequired: boolean;
  };
  firstOption: {
    value: string;
    text: string;
  };
  options: readonly string[];
  optionText: string;
};
