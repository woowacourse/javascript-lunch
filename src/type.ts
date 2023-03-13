export type Category = '전체' | '한식' | '중식' | '일식' | '양식' | '아시안' | '기타';
export type Sorting = 'name' | 'takeMinute';
export type TakeMinute = 5 | 10 | 15 | 20 | 30;

export type Restaurant = {
  id: string;
  name: string;
  category: Category;
  takeMinute: TakeMinute;
  favorite: boolean;
  description?: string;
  link?: string;
};
