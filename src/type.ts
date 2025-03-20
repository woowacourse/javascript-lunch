export interface Restaurant {
  id: number;
  name: string;
  distance: number;
  description: string;
  category: Category;
  link?: string;
  icon?: {
    src: string;
    alt: string;
  };
  isFavorite: boolean;
}

export type Category = '한식' | '중식' | '일식' | '양식' | '아시안' | '기타';
