const REGEX = Object.freeze({
  link: /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+)\.([a-z]+).*$/,
});

const RESTAURANT_CATEGORIES = [
  '한식',
  '중식',
  '일식',
  '아시안',
  '양식',
  '기타',
];

const RESTAURANT_DISTANCES = ['5', '10', '15', '20', '25', '30'];

export { REGEX, RESTAURANT_CATEGORIES, RESTAURANT_DISTANCES };
