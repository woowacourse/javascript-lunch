export type Category = '전체' | '한식' | '중식' | '일식' | '양식' | '아시안' | '기타';
export type Sorting = 'name' | 'distance';
export type TakeMinute = 5 | 10 | 15 | 20 | 30;

export type Restaurant = {
  name: string;
  category: Category;
  takeMinute: TakeMinute;
  description?: string;
  link?: string;
};
