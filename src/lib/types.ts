export type TabType = 'all' | 'like';

export type SortType = '이름순' | '거리순';
export type CategoryType = '전체' | '한식' | '중식' | '일식' | '양식' | '분식' | '기타' | '아시안';
export type DistanceType = 5 | 10 | 15 | 20 | 30;

export type RestaurantType = {
  name: string;
  description: string;
  distance: DistanceType;
  category: CategoryType;
  isLike: boolean;
  url: string;
};
