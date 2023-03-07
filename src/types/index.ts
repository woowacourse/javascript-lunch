export type RestaurantCategory = '한식' | '중식' | '일식' | '아시안' | '양식' | '기타';
export type RestaurantDistance = '5' | '10' | '15' | '20' | '30';
export type RestaurantSortType = 'name' | 'distance';

export interface IRestaurant {
  category: RestaurantCategory;
  name: string;
  distance: RestaurantDistance;
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
