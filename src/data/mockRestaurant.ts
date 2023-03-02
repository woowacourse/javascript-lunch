import { RestaurantType } from "../components/Restaurant";

export const mockKorea: RestaurantType = {
  category: "한식",
  name: "피양콩할마니",
  distance: 10,
  description: `평양 출신의 할머니가 수십 년간 운영해온 비지 전문점 피양콩 할마니. 두부를 빼지 않은 되비지를 맛볼 수 있는
  곳으로, ‘피양’은 평안도 사투리로 ‘평양’을 의미한다. 딸과 함께 운영하는 이곳에선 맷돌로 직접 간 콩만을 사용하며, 일체의 조미료를 넣지 않은 건강식을 선보인다. 콩비지와 피양 만두가 이곳의 대표
  메뉴지만, 할머니가 옛날 방식을 고수하며 만들어내는 비지전골 또한 이 집의 역사를 느낄 수 있는 특별한 메뉴다. 반찬은 손님들이 먹고 싶은 만큼 덜어 먹을 수 있게 준비돼 있다.`,
  link: "https://naver.me/G6DyD9tg",
};

const mockJapen: RestaurantType = {
  category: "일식",
  name: "피양콩일일일",
  distance: 15,
  description: `일이링리일인란이ㅏ린아리나이라니아리낭리`,
  link: "https://naver.me/G6DyD9tg",
};

const mockWestern: RestaurantType = {
  category: "양식",
  name: "피양콩양양양",
  distance: 5,
  description: `ㅌ일ㄴㅈㄹㅇㅁㄴㅇㄹㅎㅈㄷㅁㄹㅇㅇㄴㅎ류이링리일인란이ㅏ린아리나이라니아리낭리`,
  link: "https://naver.me/G6DyD9tg",
};

const mockAsian: RestaurantType = {
  category: "아시안",
  name: "피양콩아시안",
  distance: 20,
  description: `았;ㅇ;;;;;;;;;;;;;;;`,
  link: "https://naver.me/G6DyD9tg",
};

const mockEtc: RestaurantType = {
  category: "기타",
  name: "피양콩딩가딩가",
  distance: 15,
  description: `나는 기타다~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`,
  link: "https://naver.me/G6DyD9tg",
};

const mockChina: RestaurantType = {
  category: "중식",
  name: "피양콩중중중",
  distance: 30,
  description: `중꿔런쭞웆앚ㅇㄴ류ㅓㅏㄴㅁㅇ류머오뉼너ㅗㅠㅇㄹ`,
  link: "https://naver.me/G6DyD9tg",
};

export const mockList: RestaurantType[] = [
  mockAsian,
  mockChina,
  mockKorea,
  mockChina,
  mockJapen,
  mockEtc,
  mockWestern,
  mockKorea,
  mockAsian,
];
