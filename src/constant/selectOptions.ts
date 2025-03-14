import { Restaurant } from '../types/types';
import { ExtendType, ToString } from '../types/typeUtils';

const CATEGORY_OPTIONS: { value: ExtendType<Restaurant['category'], ''>; option: string }[] = [
  { value: '', option: '선택해 주세요' },
  { value: 'korean', option: '한식' },
  { value: 'chinese', option: '중식' },
  { value: 'japanese', option: '일식' },
  { value: 'western', option: '양식' },
  { value: 'asian', option: '아시안' },
  { value: 'etc', option: '기타' },
] as const;

const DISTANCE_OPTIONS: { value: ExtendType<ToString<Restaurant['distance']>, ''>; option: string }[] = [
  { value: '', option: '선택해 주세요' },
  { value: '5', option: '5분 내' },
  { value: '10', option: '10분 내' },
  { value: '15', option: '15분 내' },
  { value: '20', option: '20분 내' },
  { value: '30', option: '30분 내' },
] as const;

export { CATEGORY_OPTIONS, DISTANCE_OPTIONS };
