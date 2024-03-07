const CATEGORY = {
  whole: '전체',
  koreanFood: '한식',
  chineseFood: '중식',
  japaneseFood: '일식',
  westernFood: '양식',
  asianFood: '아시안',
  etc: '기타',
} as const;

const DISTANCE = [5, 10, 15, 20, 30];

const Condition = {
  CATEGORY,
  DISTANCE,
};

export default Condition;
