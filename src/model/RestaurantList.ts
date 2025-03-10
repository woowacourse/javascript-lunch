import { RestaurantForm, Restaurant } from "../../types/restaurantTypes";
import { ERROR_MESSAGE } from "../settings/settings";

export const restaurantList: Restaurant[] = [
  {
    name: "피양콩할마니",
    distance: "10",
    description:
      "2005년, 장모님께 전수받은 전통 설렁탕 조리법을 현대적인 감각으로 재해석한 곳. 깊고 진한 국물 맛이 일품입니다.",
    isFavorite: false,
    category: "한식",
    link: "https://pi-yangkonghalmani.com",
  },
  {
    name: "친친",
    distance: "10",
    description:
      "2004년부터 이어온 깊은 내공의 중식당. 편리한 교통과 넓은 주차 공간, 그리고 정통 중화요리를 경험할 수 있는 곳.",
    isFavorite: false,
    category: "중식",
    link: "https://chinchin-chinese.com",
  },
  {
    name: "잇쇼우",
    distance: "5",
    description:
      "정통 사누끼 우동을 직접 제면하여 선보이는 전문점. 장인의 정성이 담긴 깊은 감칠맛을 경험해 보세요.",
    isFavorite: false,
    category: "일식",
    link: "https://isshou-udon.jp",
  },
  {
    name: "이태리키친",
    distance: "20",
    description:
      "정통 이탈리안 요리에 창의적인 변화를 더한 모던 다이닝 레스토랑.",
    isFavorite: false,
    category: "양식",
    link: "https://italykitchen.co.kr",
  },
];

export function addRestaurant(restaurant: Restaurant) {
  if (searchRestaurant(restaurant.name))
    throw new Error(ERROR_MESSAGE.DUPLICATE_RESTAURANT);
  restaurantList.push(restaurant);
}

function searchRestaurant(name: string): RestaurantForm | undefined {
  return restaurantList.find((item) => item.name === name);
}
