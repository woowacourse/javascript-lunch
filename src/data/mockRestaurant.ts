import { IRestaurant } from '../domain/RestaurantListItem';

const mockKorea: IRestaurant = {
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
  name: '일일일',
  distance: 15,
  description: `평양 출신의 할머니가 수십 년간 운영해온 비지 전문점 피양콩 할마니. 두부를 빼지 않은 되비지를 맛볼 수 있는
  곳으로, ‘피양’은 평안도 사투리로 ‘평양’을 의미한다. 딸과 함께 운영하는 이곳에선 맷돌로 직접 간 콩만을 사용하며, 일체의 조미료를 넣지 않은 건강식을 선보인다. 콩비지와 피양 만두가 이곳의 대표
  메뉴지만, 할머니가 옛날 방식을 고수하며 만들어내는 비지전골 또한 이 집의 역사를 느낄 수 있는 특별한 메뉴다. 반찬은 손님들이 먹고 싶은 만큼 덜어 먹을 수 있게 준비돼 있다.`,
  link: 'https://naver.me/G6DyD9tg',
};

const mockWestern: IRestaurant = {
  category: '양식',
  name: '양양양',
  distance: 5,
  description: `평양 출신의 할머니가 수십 년간 운영해온 비지 전문점 피양콩 할마니. 두부를 빼지 않은 되비지를 맛볼 수 있는
  곳으로, ‘피양’은 평안도 사투리로 ‘평양’을 의미한다. 딸과 함께 운영하는 이곳에선 맷돌로 직접 간 콩만을 사용하며, 일체의 조미료를 넣지 않은 건강식을 선보인다. 콩비지와 피양 만두가 이곳의 대표
  메뉴지만, 할머니가 옛날 방식을 고수하며 만들어내는 비지전골 또한 이 집의 역사를 느낄 수 있는 특별한 메뉴다. 반찬은 손님들이 먹고 싶은 만큼 덜어 먹을 수 있게 준비돼 있다.`,
  link: 'https://naver.me/G6DyD9tg',
};

const mockAsian: IRestaurant = {
  category: '아시안',
  name: '아시안',
  distance: 10,
  description: `평양 출신의 할머니가 수십 년간 운영해온 비지 전문점 피양콩 할마니. 두부를 빼지 않은 되비지를 맛볼 수 있는
  곳으로, ‘피양’은 평안도 사투리로 ‘평양’을 의미한다. 딸과 함께 운영하는 이곳에선 맷돌로 직접 간 콩만을 사용하며, 일체의 조미료를 넣지 않은 건강식을 선보인다. 콩비지와 피양 만두가 이곳의 대표
  메뉴지만, 할머니가 옛날 방식을 고수하며 만들어내는 비지전골 또한 이 집의 역사를 느낄 수 있는 특별한 메뉴다. 반찬은 손님들이 먹고 싶은 만큼 덜어 먹을 수 있게 준비돼 있다.`,
  link: 'https://naver.me/G6DyD9tg',
};

const mockEtc: IRestaurant = {
  category: '기타',
  name: '딩가딩가',
  distance: 15,
  description: `평양 출신의 할머니가 수십 년간 운영해온 비지 전문점 피양콩 할마니. 두부를 빼지 않은 되비지를 맛볼 수 있는
  곳으로, ‘피양’은 평안도 사투리로 ‘평양’을 의미한다. 딸과 함께 운영하는 이곳에선 맷돌로 직접 간 콩만을 사용하며, 일체의 조미료를 넣지 않은 건강식을 선보인다. 콩비지와 피양 만두가 이곳의 대표
  메뉴지만, 할머니가 옛날 방식을 고수하며 만들어내는 비지전골 또한 이 집의 역사를 느낄 수 있는 특별한 메뉴다. 반찬은 손님들이 먹고 싶은 만큼 덜어 먹을 수 있게 준비돼 있다.`,
  link: 'https://naver.me/G6DyD9tg',
};

const mockChina: IRestaurant = {
  category: '중식',
  name: '중중중',
  distance: 20,
  description: `평양 출신의 할머니가 수십 년간 운영해온 비지 전문점 피양콩 할마니. 두부를 빼지 않은 되비지를 맛볼 수 있는
  곳으로, ‘피양’은 평안도 사투리로 ‘평양’을 의미한다. 딸과 함께 운영하는 이곳에선 맷돌로 직접 간 콩만을 사용하며, 일체의 조미료를 넣지 않은 건강식을 선보인다. 콩비지와 피양 만두가 이곳의 대표
  메뉴지만, 할머니가 옛날 방식을 고수하며 만들어내는 비지전골 또한 이 집의 역사를 느낄 수 있는 특별한 메뉴다. 반찬은 손님들이 먹고 싶은 만큼 덜어 먹을 수 있게 준비돼 있다.`,
  link: 'https://naver.me/G6DyD9tg',
};

const mock1: IRestaurant = {
  category: '중식',
  name: '친친',
  distance: 10,
  description: `Since 2004 편리한 교통과 주차, 그리고 관록만큼 깊은 맛과 정성으로 정통...`,
  link: '',
};

const mock2: IRestaurant = {
  category: '일식',
  name: '잇쇼우',
  distance: 5,
  description: `잇쇼우는 정통 자가제면 사누끼 우동이 대표메뉴입니다. 기술은 정성을 이길...`,
  link: '',
};

const mock3: IRestaurant = {
  category: '양식',
  name: '이태리키친',
  distance: 20,
  description: `2005년 장모님에게 전수받은 설렁탕 조리법을 개선하여 시작했다는 외고...`,
  link: '',
};

const mock4: IRestaurant = {
  category: '아시안',
  name: '호아빈 삼성점',
  distance: 15,
  description: `2005년 장모님에게 전수받은 설렁탕 조리법을 개선하여 시작했다는 외고...`,
  link: '',
};

const mockList: IRestaurant[] = [
  mockAsian,
  mockChina,
  mockKorea,
  mockChina,
  mockJapan,
  mockEtc,
  mockWestern,
  mockKorea,
  mockAsian,
  mock1,
  mock2,
  mock3,
  mock4,
];

export default mockList;
