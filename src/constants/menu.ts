import { Distance, RestaurantItem } from "../types/menu";

export const DEFAULT_DATA: RestaurantItem[] = [
  {
    name: "도스타코스 선릉점",
    category: "기타",
    distance: 5,
    isFavorite: false,
    description: "멕시칸 캐주얼 그릴",
    link: "",
  },
  {
    name: "이태리키친",
    category: "양식",
    distance: 20,
    isFavorite: false,
    description: "늘 변화를 추구하는 이태리키친입니다.",
    link: "",
  },
  {
    name: "잇쇼우",
    category: "일식",
    distance: 10,
    isFavorite: false,
    description:
      "잇쇼우는 정통 자가제면 사누끼 우동이 대표메뉴입니다. 기술은 정성을 이길 수 없다는 신념으로 모든 음식에 최선을 다하는 잇쇼우는 고객 한분 한분께 최선을 다하겠습니다",
    link: "",
  },
  {
    name: "친친",
    category: "중식",
    distance: 5,
    isFavorite: false,
    description: "Since 2004 편리한 교통과 주차, 그리고 관록만큼 깊은 맛과 정성으로 정통 중식의 세계를 펼쳐갑니다",
    link: "",
  },
  {
    name: "피양콩 할마니",
    category: "한식",
    distance: 10,
    isFavorite: false,
    description:
      "평양 출신의 할머니가 수십 년간 운영해온 비지 전문점 피양콩 할마니. 두부를 빼지 않은 되비지를 맛볼 수 있는 곳으로, ‘피양’은 평안도 사투리로 ‘평양’을 의미한다. 딸과 함께 운영하는 이곳에선 맷돌로 직접 간 콩만을 사용하며, 일체의 조미료를 넣지 않은 건강식을 선보인다. 콩비지와 피양 만두가 이곳의 대표 메뉴지만, 할머니가 옛날 방식을 고수하며 만들어내는 비지전골 또한 이 집의 역사를 느낄 수 있는 특별한 메뉴다. 반찬은 손님들이 먹고 싶은 만큼 덜어 먹을 수 있게 준비돼 있다.",
    link: "",
  },
  {
    name: "호아빈 삼성점",
    category: "아시안",
    distance: 15,
    isFavorite: false,
    description: "푸짐한 양에 국물이 일품인 쌀국수",
    link: "",
  },
];

export const ERROR_MESSAGES = {
  invalidRestaurantName: "식당 이름은 1글자 이상 10글자 이하여야합니다.",
  invalidCategory: "카테고리를 선택해주세요",
  invalidDistance: "거리(도보 이동 시간)을 선택해주세요",
  invalidDescriptionLength: "식당 설명은 300자 이하여야합니다",
  invalidLink: "유요하지 않은 링크 형식입니다.",
  invalidRestaurantUniqueness: "이미 존재하는 식당입니다!",
};

export const CATEGORIES = {
  all: "전체",
  korean: "한식",
  asian: "아시안",
  japanese: "일식",
  chinese: "중식",
  western: "양식",
  etc: "기타",
} as const;

export const SORT_TYPE = {
  name: "이름순",
  distance: "거리순",
} as const;

export const DISTANCES: Distance[] = [5, 10, 15, 20, 30];

export const RESTAURANT_TABS = {
  all: "모든 음식점",
  favorite: "자주 가는 음식점",
} as const;
