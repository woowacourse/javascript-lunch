import { FAVORITE_ICON_IMAGE } from '../constants/images';
export type Category = '전체' | '한식' | '중식' | '일식' | '아시안' | '양식' | '기타';
export type Distance = 5 | 10 | 15 | 20 | 30;
export type SortingCriterion = 'name' | 'distance';
export type FavoriteImageUrl = FAVORITE_ICON_IMAGE.LINED | FAVORITE_ICON_IMAGE.FILLED;

export type Restaurant = {
  category: Category;
  name: string;
  distance: Distance;
  description?: string;
  link?: string;
  favorite?: boolean;
  favoriteImageUrl?: FavoriteImageUrl;
};

export type Errors = {
  [key: string]: Boolean;
};
