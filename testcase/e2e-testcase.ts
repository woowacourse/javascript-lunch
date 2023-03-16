import { LocalStorageRestaurantData } from '../src/type';
import { Restaurant, UserRestaurantInput } from '../src/type';

const testcases: LocalStorageRestaurantData = {
  restaurants: [
    {
      category: '한식',
      distanceInMinutes: '5',
      name: '신선한밥상',
      description:
        '당신이 상상하는 전통적인 한국의 맛을 살린 새로운 조합으로 만날 수 있는 레스토랑입니다.',
      link: 'https://goodrice.com/',
      isFavorite: false,
      itemId: 0,
    },
    {
      category: '일식',
      distanceInMinutes: '20',
      name: '우리집 일본집',
      description:
        '일본의 전통적인 맛과 우리나라의 감성이 결합된, 깔끔하고 정갈한 일식 레스토랑입니다.',
      link: 'https://japanesehouse.net/',
      isFavorite: false,
      itemId: 1,
    },
    {
      category: '양식',
      distanceInMinutes: '30',
      name: '뉴욕스테이크하우스',
      description:
        '미국의 대표적인 요리 중 하나인 스테이크과 함께 다양한 면과 샐러드 등 다양한 메뉴를 즐길 수 있는 레스토랑입니다.',
      link: 'https://new-york.com/',
      isFavorite: false,
      itemId: 2,
    },
    {
      category: '양식',
      distanceInMinutes: '10',
      name: '스파이스 & 화이트',
      description:
        '서양의 전통적인 맛과 동양의 향신료를 조합하여 새로운 맛을 만들어낸 혁신적인 양식 레스토랑입니다.',
      link: 'https://spacewhite.com/main.html',
      isFavorite: false,
      itemId: 3,
    },
  ],
  id: 4,
};

const correctUserInputs: UserRestaurantInput[] = [
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
    description: '',
    link: '',
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

const restaurantsSample: Restaurant[] = [
  {
    category: '한식',
    name: '한옥식당',
    distanceInMinutes: '20',
    description: '전통적인 한식과 한옥의 아름다움을 동시에 느낄 수 있는 곳',
    link: 'https://hanok.co.kr',
    isFavorite: false,
    itemId: 0,
  },
  {
    category: '일식',
    name: '삼베스시',
    distanceInMinutes: '10',
    description:
      '신선한 재료와 정교한 손질법으로 만든 최상의 회와 일본식 요리를 즐길 수 있는 일식 전문점',
    link: 'https://sambesushi.com/main.html',
    isFavorite: true,
    itemId: 1,
  },
  {
    category: '중식',
    name: '중화요리전문점 짜장바구니',
    distanceInMinutes: '5',
    description:
      '짜장면, 짬뽕, 탕수육 등 대표적인 중화요리와 함께 새로운 중국 요리도 만나볼 수 있는 중식 전문점',
    link: 'https://baguni.io',
    isFavorite: true,
    itemId: 2,
  },
  {
    category: '양식',
    name: '더 그릴',
    distanceInMinutes: '30',
    description: '',
    link: '',
    isFavorite: true,
    itemId: 3,
  },
  {
    category: '중식',
    name: '루왕탕수육',
    distanceInMinutes: '15',
    description:
      '육즙이 풍부한 탕수육과 함께 고추가루를 올린 루왕탕수육을 맛볼 수 있는 중식당',
    link: 'https://www.luwangtangsuik.com/',
    isFavorite: false,
    itemId: 4,
  },
];

export default testcases;
