import { IRestaurant } from './domain/Restaurant';

export const mockRestaurant: IRestaurant[] = [
  {
    id: 1,
    category: '한식',
    isFavorite: false,
    distance: 10,
    name: '피양콩할마니',
    description:
      '평양 출신의 할머니가 수십 년간 운영해온 비지 전문점 피양콩 할마니. 두부를 빼지 않은 되비지를 맛볼 수 있는곳으로,‘피양’은 평안도 사투리로 ‘평양’을 의미한다. 딸과 함께 운영하는 이곳에선 맷돌로 직접 간 콩만을 사용하며, 일체의 조미료를 넣지 않은 건강식을 선보인다. 콩비지와 피양 만두가 이곳의 대표메뉴지만, 할머니가 옛날 방식을 고수하며 만들어내는 비지전골 또한 이 집의 역사를 느낄 수 있는 특별한 메뉴다. 반찬은 손님들이 먹고 싶은 만큼 덜어 먹을 수 있게 준비돼 있다.',
    link: 'https://www.naver.com',
  },
  {
    id: 2,
    category: '중식',
    isFavorite: false,
    distance: 5,
    name: '친친',
    description:
      'Since 2004 편리한 교통과 주차, 그리고 관록만큼 깊은 맛과 정성으로 정통 중식의 세계를 펼쳐갑니다',
  },
  {
    id: 3,
    category: '일식',
    isFavorite: false,
    distance: 10,
    name: '잇쇼우',
    description:
      '잇쇼우는 정통 자가제면 사누끼 우동이 대표메뉴입니다. 기술은 정성을 이길 수 없다는 신념으로 모든 음식에 최선을다하는 잇쇼우는  고객 한분 한분께 최선을 다하겠습니다',
  },
  {
    id: 4,
    category: '양식',
    isFavorite: false,
    distance: 20,
    name: '이태리키친',
    description: '늘 변화를 추구하는 이태리키친입니다.',
  },
  {
    id: 5,
    category: '아시안',
    isFavorite: false,
    distance: 15,
    name: '호아빈 삼성점',
    description: '푸짐한 양에 국물이 일품인 쌀국수',
  },
  {
    id: 6,
    category: '기타',
    isFavorite: false,
    distance: 5,
    name: '도스타코스 선릉점',
    description: '멕시칸 캐주얼 그릴',
  },
  {
    id: 7,
    category: '한식',
    isFavorite: true,
    distance: 15,
    name: '진대감',
    description: '삼겹살 삼합 판매합니다.',
  },
  {
    id: 8,
    category: '한식',
    isFavorite: false,
    distance: 15,
    name: '농민 백암 순대',
    description: '11시부터 오픈런 해도 줄서는 그 집.',
  },
  {
    id: 9,
    category: '한식',
    isFavorite: false,
    distance: 5,
    name: '용호낙지',
    description: '낙곱새 맛있는 집',
  },
];
