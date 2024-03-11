export const OPTION = {
  ALL: { value: '전체', name: '전체' },
  INFO: { value: '', name: '선택해 주세요' },
  CATEGORY: [
    { value: '한식', name: '한식' },
    { value: '중식', name: '중식' },
    { value: '일식', name: '일식' },
    { value: '아시안', name: '아시안' },
    { value: '양식', name: '양식' },
    { value: '기타', name: '기타' },
  ],
  DISTANCE: [
    { value: 5, name: '5분 내' },
    { value: 10, name: '10분 내' },
    { value: 15, name: '15분 내' },
    { value: 20, name: '20분 내' },
    { value: 30, name: '30분 내' },
  ],
  SORTING: [
    { value: '이름순', name: '이름순' },
    { value: '거리순', name: '거리순' },
  ],
} as const;

export const OPTIONS_MAP = {
  category: [OPTION.ALL, ...OPTION.CATEGORY],
  sorting: OPTION.SORTING,
  'modal-category': [OPTION.INFO, ...OPTION.CATEGORY],
  'modal-sorting': [OPTION.INFO, ...OPTION.DISTANCE],
} as const;
