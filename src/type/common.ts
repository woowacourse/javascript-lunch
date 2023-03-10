import Restaurants from '../domain/Restaurants';

type Restaurant = {
  id?: number;
  category: RestaurantCategoryType;
  name: string;
  distance: string;
  description: string;
  link: string;
  favorite: boolean;
};

type RestaurantCategoryType =
  | '전체'
  | '한식'
  | '중식'
  | '일식'
  | '아시안'
  | '양식'
  | '기타';

type RestaurantSortingType = 'name' | 'distance';

type StoreType = {
  domain: Restaurants | null;
  restaurants: Restaurant[];
  categorySelector: RestaurantCategoryType;
  sortSelector: RestaurantSortingType;
  isFavorite: boolean;
};

export { Restaurant, RestaurantCategoryType, RestaurantSortingType, StoreType };
