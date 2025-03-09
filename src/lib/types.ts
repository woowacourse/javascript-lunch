export type TabType = 'all' | 'like';
export type FilterType = '전체' | '한식' | '중식' | '일식' | '양식' | '분식' | '기타' | '아시안';
export type SortType = '이름순' | '거리순';
export type RestaurantType = {
  name: string;
  description: string;
  distance: number;
  category: string;
  isLike: boolean;
  url: string;
};
