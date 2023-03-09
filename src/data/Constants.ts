import { FilterCategory, SortCondition } from '../domain/RestaurantList';
import { Category } from '../type/Restaurant';
import { MinutesToCampus } from '../type/Restaurant';

const FILTER_CATEGORY: readonly FilterCategory[] = [
  '전체',
  '한식',
  '중식',
  '일식',
  '양식',
  '아시안',
  '기타',
];

const CATEGORY: readonly Category[] = ['한식', '중식', '일식', '양식', '아시안', '기타'];

const SORT_CONDITION: readonly SortCondition[] = ['이름', '거리'];

const MINUTES_TO_CAMPUS: readonly MinutesToCampus[] = [5, 10, 15, 20, 30];

export { FILTER_CATEGORY, CATEGORY, SORT_CONDITION, MINUTES_TO_CAMPUS };
