import { SelectOption } from '../components/Select';

export const CATEGORIES: SelectOption[] = [
  { value: '전체', label: '전체' },
  { value: '한식', label: '한식' },
  { value: '중식', label: '중식' },
  { value: '일식', label: '일식' },
  { value: '양식', label: '양식' },
  { value: '아시안', label: '아시안' },
  { value: '기타', label: '기타' },
] as const;

export const SORTING = [
  { value: 'name', label: '이름순' },
  { value: 'distance', label: '거리순' },
] as const;
