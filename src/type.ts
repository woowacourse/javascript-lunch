type Category = '한식' | '중식' | '일식' | '양식' | '아시안' | '기타';

type Distance = '5' | '10' | '15' | '20' | '30';

export interface RestaurantType {
  category: Category;
  name: string;
  distance: Distance;
  description: string;
  link: string;
}

export interface SELECTOR_INTERFACE {
  MODAL: string;
}

export interface FILTER_OPTION_INTERFACE {
  NAME: string;
  DISTANCE: string;
  ALL_CATEGORIES: string;
}

export interface ERROR_MESSAGE_INTERFACE {
  NO_SPECIAL_CHARACTERS: string;
  NAME_LENGTH_LIMIT: string;
  DUPLICATE_NAME: string;
}

export interface CATEGORY_IMAGES_INTERFACE {
  한식: string;
  중식: string;
  일식: string;
  양식: string;
  아시안: string;
  기타: string;
}
