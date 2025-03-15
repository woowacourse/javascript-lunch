export const RESTAURANT_DISTANCE_VALUES = [
  "5",
  "10",
  "15",
  "20",
  "30",
] as const;

export const RESTAURANT_FIELD_LENGTH = {
  name: { min: 1, max: 12 },
  description: { min: 0, max: 300 },
  link: { min: 0, max: 300 },
} as const;

export const INITIAL_RESTAURANT = [
  {
    name: "피양콩할마니",
    distance: 10,
    description:
      "2005년, 장모님께 전수받은 전통 설렁탕 조리법을 현대적인 감각으로 재해석한 곳. 깊고 진한 국물 맛이 일품입니다.",
    isFavorite: false,
    category: "한식",
    link: "https://pi-yangkonghalmani.com",
  },
  {
    name: "친친",
    distance: 10,
    description:
      "2004년부터 이어온 깊은 내공의 중식당. 편리한 교통과 넓은 주차 공간, 그리고 정통 중화요리를 경험할 수 있는 곳.",
    isFavorite: false,
    category: "중식",
    link: "https://chinchin-chinese.com",
  },
  {
    name: "잇쇼우",
    distance: 5,
    description:
      "정통 사누끼 우동을 직접 제면하여 선보이는 전문점. 장인의 정성이 담긴 깊은 감칠맛을 경험해 보세요.",
    isFavorite: false,
    category: "일식",
    link: "https://isshou-udon.jp",
  },
  {
    name: "이태리키친",
    distance: 20,
    description:
      "정통 이탈리안 요리에 창의적인 변화를 더한 모던 다이닝 레스토랑.",
    isFavorite: false,
    category: "양식",
    link: "https://italykitchen.co.kr",
  },
  {
    name: "수라간",
    distance: 5,
    description:
      "궁중 요리를 현대적으로 재해석한 한정식 전문점. 엄선된 재료와 정갈한 조리법으로 한식의 품격을 느낄 수 있습니다.",
    isFavorite: false,
    category: "한식",
    link: "https://souragan.kr",
  },
  {
    name: "홍콩반점0410",
    distance: 15,
    description:
      "가성비 뛰어난 짬뽕과 탕수육을 맛볼 수 있는 프랜차이즈 중식당. 매운맛 조절이 가능하며, 해물 육수로 깊은 맛을 냅니다.",
    isFavorite: false,
    category: "중식",
    link: "https://hongkongbanjum.com",
  },
  {
    name: "스시히로바",
    distance: 10,
    description:
      "고급 오마카세 스타일의 스시 전문점. 신선한 해산물과 장인의 기술이 어우러져 정통 일본 초밥의 깊은 풍미를 제공합니다.",
    isFavorite: false,
    category: "일식",
    link: "https://sushihiroba.com",
  },
  {
    name: "타이팟",
    distance: 20,
    description:
      "현지에서 직접 공수한 향신료를 활용해 태국 전통 요리를 선보이는 레스토랑. 팟타이와 똠양꿍이 대표 메뉴입니다.",
    isFavorite: false,
    category: "아시안",
    link: "https://thaipat.com",
  },
  {
    name: "비스트로루카",
    distance: 10,
    description:
      "이탈리아 가정식을 모티브로 한 소박하지만 정성 가득한 요리를 선보이는 레스토랑. 따뜻한 분위기 속에서 즐기는 파스타와 리조또가 인기입니다.",
    isFavorite: false,
    category: "양식",
    link: "https://bistroluca.com",
  },
  {
    name: "BBQ치킨",
    distance: 5,
    description:
      "바삭하고 촉촉한 프리미엄 치킨을 즐길 수 있는 브랜드. 다양한 소스와 사이드 메뉴가 준비되어 있습니다.",
    isFavorite: false,
    category: "기타",
    link: "https://bbqchicken.com",
  },
] as const;
