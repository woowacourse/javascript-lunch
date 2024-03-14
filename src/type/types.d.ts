type TSortingOption = '이름순' | '거리순';
type TDistance = 5 | 10 | 15 | 20 | 30;
type TCategory = '한식' | '중식' | '일식' | '아시안' | '양식' | '기타';
type TAllCategory = '전체' | TCategory;

interface IRestaurant {
  category: TCategory;
  name: string;
  distance: TDistance;
  description?: string;
  reference?: string;
}

declare module '*.png';
