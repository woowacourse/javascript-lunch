export const CATEGORY = [
  '한식',
  '중식',
  '일식',
  '아시안',
  '양식',
  '기타',
] as const;
export const FILTER = ['이름순', '거리순'] as const;

export const SELECT_DISTANCE = [
  { value: '', text: '선택해 주세요' },
  { value: '5', text: '5분 내' },
  { value: '10', text: '10분 내' },
  { value: '15', text: '15분 내' },
  { value: '20', text: '20분 내' },
  { value: '30', text: '30분 내' },
];
