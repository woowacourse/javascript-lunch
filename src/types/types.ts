type SelectOption = {
  readonly value: string;
  readonly option: string;
};

export type SelectOptions = readonly SelectOption[];

type Distance = 5 | 10 | 15 | 20 | 30;
type Category = '한식' | '중식' | '일식' | '양식' | '아시안' | '기타';

export type Restaurant = {
  category: Category;
  distance: Distance;
  name: string;
  description?: string;
  link?: string;
};
