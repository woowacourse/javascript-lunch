export interface Restaurant {
  category: '한식' | '중식' | '일식' | '아시안' | '양식' | '기타';
  name: string;
  distance: 5 | 10 | 15 | 20 | 30;
  description?: string;
  link?: string;
}

export interface CategoryFilter {
  value: '전체' | '한식' | '중식' | '일식' | '아시안' | '양식' | '기타';
}

export interface SortTypeFilter {
  value: 'name' | 'distance';
}
