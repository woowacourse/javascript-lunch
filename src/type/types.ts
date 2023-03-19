import FavoriteIcon from '../components/FavoriteIcon';
import RestaurantCategory from '../components/RestaurantCategory';
import RestaurantDescription from '../components/RestaurantDescription';
import RestaurantDistance from '../components/RestaurantDistance';
import RestaurantName from '../components/RestaurantName';

export type SortingOption =
  | 'name'
  | 'distance'
  | '한식'
  | '중식'
  | '일식'
  | '양식'
  | '아시안'
  | '기타'
  | '전체';

export interface RestaurantType {
  number: number;
  category: '한식' | '중식' | '일식' | '양식' | '아시안' | '기타';
  name: string;
  distance: '5' | '10' | '15' | '20' | '30';
  description: string;
  link: string;
  isFavorite: boolean;
}

export interface SortBy {
  [key: string]: (list: RestaurantType[]) => RestaurantType[];
}

export interface RestaurantListState {
  container: string;
  nameComponent: RestaurantName | null;
  distanceComponent: RestaurantDistance | null;
  categoryComponent: RestaurantCategory | null;
  favoriteComponent: FavoriteIcon | null;
  descriptionComponent: RestaurantDescription | null;
}
