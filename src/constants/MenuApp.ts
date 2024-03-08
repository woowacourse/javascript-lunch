type Category = "한식" | "일식" | "아시안" | "양식" | "중식" | "전체" | "기타";
type Distance = 5 | 10 | 15 | 20 | 30;

interface TRestaurant {
  name: string;
  category: Category;
  distance: Distance;
  description?: string;
}

export const DEFAULT_DATA: TRestaurant[] = [
  {
    name: "피양콩 할마니",
    distance: 10,
    description:
      "평양 출신의 할머니가 수십 년간 운영해온 비지 전문점 피양콩 할마니. 두부를 빼지 않은 되비지를 맛볼 수 있는 곳으로, ‘피양’은 평안도 사투리로 ‘평양’을 의미한다. 딸과 함께 운영하는 이곳에선 맷돌로 직접 간 콩만을 사용하며, 일체의 조미료를 넣지 않은 건강식을 선보인다. 콩비지와 피양 만두가 이곳의 대표 메뉴지만, 할머니가 옛날 방식을 고수하며 만들어내는 비지전골 또한 이 집의 역사를 느낄 수 있는 특별한 메뉴다. 반찬은 손님들이 먹고 싶은 만큼 덜어 먹을 수 있게 준비돼 있다.",
    category: "한식",
  },
  {
    name: "친친",
    distance: 5,
    description:
      "Since 2004 편리한 교통과 주차, 그리고 관록만큼 깊은 맛과 정성으로 정통 중식의 세계를 펼쳐갑니다",
    category: "중식",
  },
  {
    name: "잇쇼우",
    distance: 10,
    description:
      "잇쇼우는 정통 자가제면 사누끼 우동이 대표메뉴입니다. 기술은 정성을 이길 수 없다는 신념으로 모든 음식에 최선을 다하는 잇쇼우는 고객 한분 한분께 최선을 다하겠습니다",
    category: "일식",
  },
  {
    name: "이태리키친",
    distance: 20,
    description: "늘 변화를 추구하는 이태리키친입니다.",
    category: "양식",
  },
  {
    name: "호아빈 삼성점",
    distance: 15,
    description: "푸짐한 양에 국물이 일품인 쌀국수",
    category: "아시안",
  },
  {
    name: "도스타코스 선릉점",
    distance: 5,
    description: "멕시칸 캐주얼 그릴",
    category: "기타",
  },
];

export const ERROR_MESSAGES = {
  invalidRestaurantName: "식당 이름은 1글자 이상 10글자 이하여야합니다.",
  invalidCategory: "카테고리를 선택해주세요",
  invalidDisctance: "거리(도보 이동 시간)을 선택해주세요",
  invalidDescriptionLength: "식당 설명은 300자 이하여야합니다",
  invalidLink: "유요하지 않은 링크 형식입니다.",
  invalidRestaurantUniquness: "이미 존재하는 식당입니다!",
};

export const CATEGORY_OPTIONS = [
  "한식",
  "중식",
  "일식",
  "양식",
  "아시안",
  "기타",
];

export const DISTANCE_OPTIONS = [
  "선택해주세요",
  "5분 내",
  "10분 내",
  "15분 내",
  "20분 내",
  "30분 내",
];

export const DISTANCE_OPTION_VALUES = ["", "5", "10", "15", "20", "30"];
