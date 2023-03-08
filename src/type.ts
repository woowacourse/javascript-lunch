export type Category = '전체' | '한식' | '중식' | '일식' | '양식' | '아시안' | '기타';
export type SortBy = 'name' | 'distance';
export type TabBarSelect = 'all' | 'favorite';
export type Distance = 5 | 10 | 15 | 20 | 30;

export type SelectOption = {
  value: Category | SortBy;
  textContent: string;
};

export type Restaurant = {
  name: string;
  category: Category;
  distance: Distance;
  description?: string;
  link?: string;
  isFavorite: boolean;
};
