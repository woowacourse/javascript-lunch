const CATEGORY_FILTERS = [
  { value: '전체', option: '전체' },
  { value: '한식', option: '한식' },
  { value: '중식', option: '중식' },
  { value: '일식', option: '일식' },
  { value: '양식', option: '양식' },
  { value: '아시안', option: '아시안' },
  { value: '기타', option: '기타' },
];

const SORTING_FILTERS = [
  { value: 'name', option: '이름순' },
  { value: 'distance', option: '거리순' },
];

const CATEGORIES = [
  { value: '', option: '선택해 주세요' },
  { value: '한식', option: '한식' },
  { value: '중식', option: '중식' },
  { value: '일식', option: '일식' },
  { value: '양식', option: '양식' },
  { value: '아시안', option: '아시안' },
  { value: '기타', option: '기타' },
];

const DISTANCES = [
  { value: 5, option: '5분 내' },
  { value: 10, option: '10분 내' },
  { value: 15, option: '15분 내' },
  { value: 20, option: '20분 내' },
  { value: 30, option: '30분 내' },
];

const SELECT_OPTIONS = new Map([
  ['categoryFilters', CATEGORY_FILTERS],
  ['sortingFilters', SORTING_FILTERS],
  ['categories', CATEGORIES],
  ['distances', DISTANCES],
]);

export default SELECT_OPTIONS;
