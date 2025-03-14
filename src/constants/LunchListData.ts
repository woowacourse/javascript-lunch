import { LunchItem } from "../type.ts";

export const lunchItems: LunchItem[] = [
  {
    category: "한식",
    name: "피양콩할머니",
    distance: 10,
    description:
      "2005년 장모님에게 전수받은 설렁탕 조리법을 개선하여 시작했다는 외고...",
    isFavorite: true,
  },
  {
    category: "중식",
    name: "친친",
    distance: 10,
    description:
      "Since 2004 편리한 교통과 주차, 그리고 관록만큼 깊은 맛과 정성으로 정통...",
    isFavorite: false,
  },
  {
    category: "일식",
    name: "잇쇼우",
    distance: 5,
    description:
      "잇쇼우는 정통 자가제면 사누끼 우동이 대표메뉴입니다. 기술은 정성을 이길...",
    isFavorite: true,
  },
  {
    category: "양식",
    name: "이태리키친",
    distance: 20,
    description:
      "2005년 장모님에게 전수받은 설렁탕 조리법을 개선하여 시작했다는 외고...",
    isFavorite: false,
  },
  {
    category: "기타",
    name: "호야빈 삼성점",
    distance: 15,
    description:
      "2005년 장모님에게 전수받은 설렁탕 조리법을 개선하여 시작했다는 외고...",
    isFavorite: false,
  },
];
