import type { IDropdownAttributes, IOptionAttributes } from '../types/dom';
import type { TCategory } from '../types/restaurant';

import asian from '../assets/images/category-asian.png';
import chinese from '../assets/images/category-chinese.png';
import etc from '../assets/images/category-etc.png';
import japanese from '../assets/images/category-japanese.png';
import korean from '../assets/images/category-korean.png';
import western from '../assets/images/category-western.png';

const ALL = '전체';

const FOOD_CATEGORY: IOptionAttributes[] = [
  { value: '한식', text: '한식' },
  { value: '중식', text: '중식' },
  { value: '일식', text: '일식' },
  { value: '양식', text: '양식' },
  { value: '아시안', text: '아시안' },
  { value: '기타', text: '기타' },
];

const FILTERED_CATEGORY_ATTRIBUTE: IDropdownAttributes = {
  name: 'category',
  id: 'category-filter',
  classNames: ['restaurant-filter'],
};
const FILTERED_CATEGORY: IOptionAttributes[] = [{ value: ALL, text: ALL }, ...FOOD_CATEGORY];

const BY_NAME_ASC = '이름순';
const BY_DISTANCE_ASC = '거리순';
const SORTING_ATTRIBUTE: IDropdownAttributes = {
  name: 'sorting',
  id: 'sorting-filter',
  classNames: ['restaurant-filter'],
};
const SORTING: IOptionAttributes[] = [
  { value: 'name', text: BY_NAME_ASC },
  { value: 'distance', text: BY_DISTANCE_ASC },
];

const FORM_CATEGORY_ATTRIBUTE: IDropdownAttributes = { name: 'category', id: 'category', required: true };
const FORM_CATEGORY: IOptionAttributes[] = [{ value: '', text: '선택해 주세요' }, ...FOOD_CATEGORY];

const FORM_DISTANCE_ATTRIBUTE: IDropdownAttributes = { name: 'distance', id: 'distance', required: true };
const FORM_DISTANCE: IOptionAttributes[] = [
  { value: '', text: '선택해 주세요' },
  { value: '5', text: '5분 내' },
  { value: '10', text: '10분 내' },
  { value: '15', text: '15분 내' },
  { value: '20', text: '20분 내' },
  { value: '30', text: '30분 내' },
];

const CATEGORY_IMG_SRC: Record<TCategory, any> = {
  전체: '',
  한식: korean,
  중식: chinese,
  일식: japanese,
  양식: western,
  아시안: asian,
  기타: etc,
};

export {
  ALL,
  FILTERED_CATEGORY_ATTRIBUTE,
  FILTERED_CATEGORY,
  BY_NAME_ASC,
  BY_DISTANCE_ASC,
  SORTING_ATTRIBUTE,
  SORTING,
  FORM_CATEGORY_ATTRIBUTE,
  FORM_CATEGORY,
  FORM_DISTANCE_ATTRIBUTE,
  FORM_DISTANCE,
  CATEGORY_IMG_SRC,
};
