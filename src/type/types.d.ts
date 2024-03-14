declare module '*.png';

type TTabOption = '모든 음식점' | '자주 가는 음식점';
type TSortingOption = '이름순' | '거리순';
type TDistance = 5 | 10 | 15 | 20 | 30;
type TCategory = '한식' | '중식' | '일식' | '아시안' | '양식' | '기타';
type TAllCategory = '전체' | TCategory;

interface Restaurant {
  category: TCategory;
  name: string;
  distance: TDistance;
  description?: string;
  reference?: string;
  isFavorite: boolean;
}

interface IRestaurant {
  key: number;
  category: TCategory;
  name: string;
  distance: TDistance;
  description?: string;
  reference?: string;
  isFavorite: boolean;
}

interface IOption {
  value: string | number;
  name: string;
}

interface IOptionsMap {
  [key: string]: Option[];
}
