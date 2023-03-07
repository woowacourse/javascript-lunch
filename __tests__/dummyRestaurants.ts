import { Restaurant } from '../src/type';

const dummyRestaurants: Restaurant[] = [
  {
    category: '한식',
    name: '한옥식당',
    distanceInMinutes: '20',
    description: '전통적인 한식과 한옥의 아름다움을 동시에 느낄 수 있는 곳',
    link: 'https://hanok.co.kr',
  },
  {
    category: '일식',
    name: '삼베스시',
    distanceInMinutes: '10',
    description:
      '신선한 재료와 정교한 손질법으로 만든 최상의 회와 일본식 요리를 즐길 수 있는 일식 전문점',
    link: 'https://sambesushi.com/main.html',
  },
  {
    category: '중식',
    name: '중화요리전문점 짜장바구니',
    distanceInMinutes: '5',
    description:
      '짜장면, 짬뽕, 탕수육 등 대표적인 중화요리와 함께 새로운 중국 요리도 만나볼 수 있는 중식 전문점',
    link: 'https://baguni.io',
  },
  {
    category: '양식',
    name: '더 그릴',
    distanceInMinutes: '30',
    description: '프라임 스테이크와 와인을 즐길 수 있는 퓨전 양식 레스토랑',
    link: 'https://grillsite.net',
  },
  {
    category: '중식',
    name: '루왕탕수육',
    distanceInMinutes: '15',
    description:
      '육즙이 풍부한 탕수육과 함께 고추가루를 올린 루왕탕수육을 맛볼 수 있는 중식당',
    link: 'https://www.luwangtangsuik.com/',
  },
];

export default dummyRestaurants;
