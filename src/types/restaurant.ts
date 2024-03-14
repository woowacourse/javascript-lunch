import type Restaurant from '../domain/Restaurant';

type TCategory = '전체' | '한식' | '중식' | '일식' | '아시안' | '양식' | '기타';
type TSorting = '이름순' | '거리순';
type TDistance = 5 | 10 | 15 | 20 | 30;

interface IRestaurant {
  id: string;
  category: TCategory;
  name: string;
  distance: TDistance;
  isFavorite: boolean;
  description?: string;
  referenceLink?: string;
}

type TFormValidRestaurant = Omit<IRestaurant, 'id' | 'isFavorite'>;

type TRestaurantInstance = InstanceType<typeof Restaurant>;
type IRestaurantList = TRestaurantInstance[];

export type { TCategory, TSorting, TDistance, IRestaurant, TFormValidRestaurant, TRestaurantInstance, IRestaurantList };
