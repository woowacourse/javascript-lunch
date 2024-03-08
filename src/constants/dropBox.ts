import { DropBoxName, SelectProps, OptionProps } from '../types';
// TODO: 파일 분리
export type DropBoxMapValue = {
  selectProps: SelectProps;
  labelText: string;
  options: OptionProps[];
};

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
      options: [
        { value: 'all', text: '전체' },
        { value: 'korean', text: '한식' },
        { value: 'chinese', text: '중식' },
        { value: 'japanese', text: '일식' },
        { value: 'western', text: '양식' },
        { value: 'asian', text: '아시안' },
        { value: 'etc', text: '기타' },
      ],
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
        { value: 'korean', text: '한식' },
        { value: 'chinese', text: '중식' },
        { value: 'japanese', text: '일식' },
        { value: 'western', text: '양식' },
        { value: 'asian', text: '아시안' },
        { value: 'etc', text: '기타' },
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
