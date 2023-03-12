export type Restaurant = {
  category: Category;
  storeName: string;
  distance: number;
  detail?: string;
  link?: string;
  starShape: StarShape;
};

export type Category = '전체' | '한식' | '중식' | '일식' | '양식' | '아시안' | '기타';

export type SortBy = 'name' | 'distance';

export type StarShape = 'lined' | 'filled';
