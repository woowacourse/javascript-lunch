import { IRestaurant } from '../domain/RestaurantListItem';

const mockKorean: IRestaurant = {
  category: '한식',
  name: '피양콩할마니',
  distance: 10,
  description: `평양 출신의 할머니가 수십 년간 운영해온 비지 전문점 피양콩 할마니. 두부를 빼지 않은 되비지를 맛볼 수 있는
  곳으로, ‘피양’은 평안도 사투리로 ‘평양’을 의미한다. 딸과 함께 운영하는 이곳에선 맷돌로 직접 간 콩만을 사용하며, 일체의 조미료를 넣지 않은 건강식을 선보인다. 콩비지와 피양 만두가 이곳의 대표
  메뉴지만, 할머니가 옛날 방식을 고수하며 만들어내는 비지전골 또한 이 집의 역사를 느낄 수 있는 특별한 메뉴다. 반찬은 손님들이 먹고 싶은 만큼 덜어 먹을 수 있게 준비돼 있다.`,
  link: 'https://naver.me/G6DyD9tg',
};

const mockJapan: IRestaurant = {
  category: '일식',
  name: '돈카라',
  distance: 10,
  description: `생선까스 맛집`,
  link: 'https://naver.me/G6DyD9tg',
};

const mockWestern: IRestaurant = {
  category: '양식',
  name: '도미노피자',
  distance: 5,
  description: `스테이크 피자 맛집`,
  link: 'https://naver.me/G6DyD9tg',
};

const mockAsian: IRestaurant = {
  category: '아시안',
  name: '피앤창',
  distance: 20,
  description: `아메리칸 동남아 스타일 음식점`,
  link: 'https://naver.me/G6DyD9tg',
};

const mockChina: IRestaurant = {
  category: '중식',
  name: '용용선생',
  distance: 30,
  description: `마라전골이 맛있는 집`,
  link: 'https://naver.me/G6DyD9tg',
};

const mockEtc: IRestaurant = {
  category: '기타',
  name: '타코',
  distance: 15,
  description: `타코가 맛있는 집`,
  link: 'https://naver.me/G6DyD9tg',
};

export const mockList: IRestaurant[] = [
  mockKorean,
  mockChina,
  mockJapan,
  mockEtc,
  mockWestern,
  mockAsian,
];
