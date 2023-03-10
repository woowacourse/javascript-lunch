export type Category = '한식' | '중식' | '일식' | '아시안' | '양식' | '기타';

export type Distance = 5 | 10 | 15 | 20 | 30;

export type State = { filter: string; isModalOpen: boolean; sortingOption: string; restaurants: Restaurant[] };

export interface Restaurant {
  id?: number;
  name: string;
  category: Category;
  distance: number;
  description?: string;
  link?: string;
  isLike?: boolean;
}
