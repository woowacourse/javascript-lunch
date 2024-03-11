type OptionType = {
  value: string;
  content: string;
};

type LabelType = {
  classList: string[];
  content: string;
} | null;

type SelectedDataType = {
  [key: string]: {
    id: string;
    name: string;
    classList: string[];
    isRequired: boolean;
    options: OptionType[];
    label: LabelType;
  };
};

export const SELECT_FILTER_DATA: SelectedDataType = {
  sorting: {
    id: 'sorting-filter',
    name: 'sorting',
    classList: ['restaurant-filter'],
    isRequired: false,

    options: [
      { value: 'name', content: '이름순' },
      { value: 'distance', content: '거리순' },
    ],

    label: null,
  },

  category: {
    id: 'category-filter',
    name: 'category',
    classList: ['restaurant-filter'],
    isRequired: false,

    options: [
      { value: '전체', content: '전체' },
      { value: '한식', content: '한식' },
      { value: '중식', content: '중식' },
      { value: '일식', content: '일식' },
      { value: '양식', content: '양식' },
      { value: '아시안', content: '아시안' },
      { value: '기타', content: '기타' },
    ],

    label: null,
  },
};

export const SELECT_FORM_DATA: SelectedDataType = {
  category: {
    id: 'category',
    name: 'category',
    isRequired: true,
    classList: [],

    options: [
      { value: '', content: '선택해 주세요.' },
      { value: '한식', content: '한식' },
      { value: '중식', content: '중식' },
      { value: '일식', content: '일식' },
      { value: '양식', content: '양식' },
      { value: '아시안', content: '아시안' },
      { value: '기타', content: '기타' },
    ],

    label: {
      classList: ['text-caption'],
      content: '카테고리',
    },
  },
  distance: {
    id: 'distance',
    name: 'distance',
    isRequired: true,
    classList: [],

    options: [
      { value: '', content: '선택해 주세요' },
      { value: '5', content: '5분 내' },
      { value: '10', content: '10분 내' },
      { value: '15', content: '15분 내' },
      { value: '20', content: '20분 내' },
      { value: '30', content: '30분 내' },
    ],

    label: {
      classList: ['text-caption'],
      content: '거리(도보 이동 시간)',
    },
  },
};

type RulesType = {
  [key: string]: string[];
};

export const RULES: RulesType = {
  requiredIds: ['category', 'name', 'distance'],
  selectIds: ['sorting-filter', 'category-filter'],
};

type ConvertType = {
  [key: string]: string;
};

export const CONVERT: ConvertType = {
  name: '이름',
  category: '카테고리',
  distance: '거리',
};
