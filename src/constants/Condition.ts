const CATEGORY = {
  WHOLE: '전체',
  KOREAN_FOOD: '한식',
  CHINESE_FOOD: '중식',
  JAPANESE_FOOD: '일식',
  WESTERN_FOOD: '양식',
  ASIAN_FOOD: '아시안',
  ETC: '기타',
} as const;

const DISTANCE = {
  FIVE: 5,
  TEN: 10,
  FIFTEEN: 15,
  TWENTY: 20,
  THIRTY: 30,
} as const;

const Condition = {
  CATEGORY,
  DISTANCE,
};

export default Condition;
