export type Category = 'korean' | 'chinese' | 'japanese' | 'western' | 'asian' | 'etc';
export type CategoryName = '한식' | '중식' | '일식' | '양식' | '아시안' | '기타';

export interface Restaurant {
  id: string;
  name: string;
  category: Category;
  categoryName: CategoryName;
  distance: number;
  description: string;
  favorites: boolean;
}