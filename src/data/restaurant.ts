export type Restaurant = {
  dataId: number;
  categoryIcon: string;
  categoryTitle: string;
  name: string;
  distance: number;
  distanceCaption: string;
  description: string;
  link: string;
  isFavorite: boolean;
};

export const restaurantData: Restaurant[] = [
  {
    dataId: 1,
    categoryIcon: "images/category-korean.png",
    categoryTitle: "한식",
    name: "피양콩할마니",
    distance: 10,
    distanceCaption: "캠퍼스부터 10분 내",
    description:
      "평양 출신의 할머니가 수십 년간 운영해온 비지 전문점 피양콩 할마니...",
    link: "https://naver.me/5Rh0ttMw",
    isFavorite: false,
  },
  {
    dataId: 2,
    categoryIcon: "images/category-chinese.png",
    categoryTitle: "중식",
    name: "친친",
    distance: 5,
    distanceCaption: "캠퍼스부터 5분 내",
    description:
      "Since 2004 편리한 교통과 주차, 그리고 관록만큼 깊은 맛과 정성으로...",
    link: "https://naver.me/FV7Y4RTm",
    isFavorite: false,
  },
  {
    dataId: 3,
    categoryIcon: "images/category-japanese.png",
    categoryTitle: "일식",
    name: "잇쇼우",
    distance: 10,
    distanceCaption: "캠퍼스부터 10분 내",
    description: "잇쇼우는 정통 자가제면 사누끼 우동이 대표메뉴입니다...",
    link: "https://naver.me/FLyTJ4dC",
    isFavorite: false,
  },
  {
    dataId: 4,
    categoryIcon: "images/category-western.png",
    categoryTitle: "양식",
    name: "이태리키친",
    distance: 20,
    distanceCaption: "캠퍼스부터 20분 내",
    description: "늘 변화를 추구하는 이태리키친입니다.",
    link: "https://naver.me/5huapW2k",
    isFavorite: false,
  },
  {
    dataId: 5,
    categoryIcon: "images/category-asian.png",
    categoryTitle: "아시안",
    name: "호아빈 삼성점",
    distance: 15,
    distanceCaption: "캠퍼스부터 15분 내",
    description: "푸짐한 양에 국물이 일품인 쌀국수",
    link: "https://naver.me/5WOQLjn6",
    isFavorite: false,
  },
  {
    dataId: 6,
    categoryIcon: "images/category-etc.png",
    categoryTitle: "기타",
    name: "도스타코스 선릉점",
    distance: 5,
    distanceCaption: "캠퍼스부터 5분 내",
    description: "멕시칸 캐주얼 그릴",
    link: "https://naver.me/Gn0yLQ8K",
    isFavorite: false,
  },
];

export const saveRestaurantsToLocalStorage = (restaurants: Restaurant[]) => {
  if (!localStorage.getItem("restaurants")) {
    localStorage.setItem("restaurants", JSON.stringify(restaurantData));
    console.log(JSON.stringify(restaurantData));
  } else localStorage.setItem("restaurants", JSON.stringify(restaurants));
};

export const getRestaurantsFromLocalStorage = () => {
  const storedData = localStorage.getItem("restaurants");
  if (!storedData) {
    localStorage.setItem("restaurants", JSON.stringify(restaurantData));
    return restaurantData;
  }
  return JSON.parse(storedData);
};

export let currentRestaurantData: Restaurant[] =
  getRestaurantsFromLocalStorage();
