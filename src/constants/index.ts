const ALL_CATEGORY = "전체";
const SORT_FAILED_NUMBER = 0;
const NO_ELEMENT = "none";
const NOT_SELECTED_INDEX = -1;

const URL_REGEX =
  /(http[s]?|ftp):\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}/g;

const DUMMY_DATA = [
  {
    category: "중식",
    name: "찐친",
    distance: 5,
    description: "찐친들이랑 가는 중국집",
    link: "",
    isFavorite: false,
  },
  {
    category: "기타",
    name: "커피베네",
    distance: 5,
    description: "성담빌딩 건물에 있는 커피베네",
    link: "",
    isFavorite: false,
  },
  {
    category: "기타",
    name: "스타벅스 선릉역점",
    distance: 5,
    description: "면담하기 좋은 곳 스타벅스 시끌벅적함",
    link: "",
    isFavorite: false,
  },
  {
    category: "한식",
    name: "영동칼국수",
    distance: 15,
    description:
      "멀긴 한데 그래도 9,000원이라는 가격에 저렴하게 적게 먹을 수 있는 곳. 지갑 다이어트하기 좋은 곳",
    link: "",
    isFavorite: false,
  },
];

export {
  ALL_CATEGORY,
  SORT_FAILED_NUMBER,
  NO_ELEMENT,
  URL_REGEX,
  NOT_SELECTED_INDEX,
  DUMMY_DATA,
};
