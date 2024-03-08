export type TSortingOption = '이름순' | '거리순';
export type TDistance = 5 | 10 | 15 | 20 | 30;
export type TCategory = '한식' | '중식' | '일식' | '아시안' | '양식' | '기타';
export type TAllCategory = '전체' | TCategory;

export interface IRestaurant {
  category: TCategory;
  name: string;
  distance: TDistance;
  description?: string;
  reference?: string;
}
