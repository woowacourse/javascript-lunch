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

const REGULAR_EXPRESSION = {
  URL: '/^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/',
};

const Condition = {
  CATEGORY,
  DISTANCE,
  REGULAR_EXPRESSION,
};

export default Condition;
