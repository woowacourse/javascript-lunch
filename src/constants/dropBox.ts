import { DropBoxName, DropBoxMapValue } from '../types';
import { CATEGORY_OPTIONS } from './rule';

export const DROP_BOX_MAP = new Map<DropBoxName, DropBoxMapValue>([
  [
    'filteringSorting',
    {
      selectProps: {
        name: 'sorting',
        id: 'filtering-sorting',
        class: 'restaurant-filter',
        required: false,
      },
      labelText: '이름순, 거리순 졍렬',
      options: [
        { value: 'name', text: '이름순' },
        { value: 'distance', text: '거리순' },
      ],
    },
  ],

  [
    'filteringCategory',
    {
      selectProps: {
        name: 'category',
        id: 'filtering-category',
        class: 'restaurant-filter',
        required: false,
      },
      labelText: '카테고리 정렬',
      options: [{ value: 'all', text: '전체' }, ...CATEGORY_OPTIONS],
    },
  ],

  [
    'category',
    {
      selectProps: {
        name: 'category',
        id: 'category-filter',
        class: 'restaurant-filter',
        required: true,
      },
      labelText: '카테고리 정렬',
      options: [
        { value: '', text: '선택해주세요.', hidden: true },
        ...CATEGORY_OPTIONS,
      ],
    },
  ],

  [
    'distance',
    {
      selectProps: {
        name: 'distance',
        id: 'distance-filter',
        class: 'restaurant-filter',
        required: true,
      },
      labelText: '상점 거리 입력',
      options: [
        { value: '', text: '선택해주세요.', hidden: true },
        { value: '5', text: '5' },
        { value: '10', text: '10' },
        { value: '15', text: '15' },
        { value: '20', text: '20' },
        { value: '30', text: '30' },
      ],
    },
  ],
]);
