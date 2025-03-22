export type Category = '전체' | '한식' | '중식' | '일식' | '양식' | '아시안' | '기타';
export type SortOption = 'name' | 'distance';

export interface FilterOption<T extends string> {
  value: T;
  label: string;
}
