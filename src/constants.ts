export const FORM_ARRAY = [
  "category",
  "name",
  "distance",
  "description",
  "link",
];

export const REGEX = {
  NAME: /^[가-힣|a-z|A-Z|0-9| ]+$/,
  URL: /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
};

export const CATEGORY = {
  한식: "./category-korean.png",
  일식: "./category-japanese.png",
  양식: "./category-western.png",
  중식: "./category-chinese.png",
  아시안: "./category-asian.png",
  기타: "./category-etc.png",
};

export const ERROR_MESSAGE = {
  NAME: "유효한 이름을 입력해주세요.(특수문자 제외)",
  DUPLICATED: "중복된 가게 이름이 있습니다.",
  URL: "유효한 주소를 입력해주세요.",
};

export const KEY = "restaurants";
