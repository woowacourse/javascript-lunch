import { Category, DistanceByWalk } from '../../src/app/enum/enums';
import type { RestaurantType, RestaurantDataType } from '../../src/app/type/restaurantTypes';

export const defaultRestaurantData: RestaurantType[] = [
  {
    id: '1',
    name: '피양콩할마니',
    category: Category.한식,
    distanceByWalk: DistanceByWalk['15분 내'],
    description:
      '평양 출신의 할머니가 수십 년간 운영해온 비지 전문점 피양콩 할마니. 두부를 빼지 않은 되비지를 맛볼 수 있는 곳으로, ‘피양’은 평안도 사투리로 ‘평양’을 의미한다. 딸과 함께 운영하는 이곳에선 맷돌로 직접 간 콩만을 사용하며, 일체의 조미료를 넣지 않은 건강식을 선보인다. 콩비지와 피양 만두가 이곳의 대표 메뉴지만, 할머니가 옛날 방식을 고수하며 만들어내는 비지전골 또한 이 집의 역사를 느낄 수 있는 특별한 메뉴다. 반찬은 손님들이 먹고 싶은 만큼 덜어 먹을 수 있게 준비돼 있다.',
    referenceUrl: 'https://piyang.modoo.at/',
    favorite: true,
  },
  {
    id: '2',
    name: '잇쇼우',
    category: Category.일식,
    distanceByWalk: DistanceByWalk['10분 내'],
    description:
      '잇쇼우는 정통 자가제면 사누끼 우동이 대표메뉴입니다. 기술은 정성을 이길 수 없다는 신념으로 모든 음식에 최선을 다하는 잇쇼우는 고객 한분 한분께 최선을 다하겠습니다.',
    favorite: false,
  },
  {
    id: '3',
    name: '이태리키친',
    category: Category.양식,
    distanceByWalk: DistanceByWalk['20분 내'],
    description: '늘 변화를 추구하는 이태리키친입니다.',
  },
  {
    id: '4',
    name: '호아빈 삼성점',
    category: Category.아시안,
    distanceByWalk: DistanceByWalk['15분 내'],
    description: '푸짐한 양에 국물이 일품인 쌀국수',
    referenceUrl: 'https://hoabinh.co.kr/franchise/list?viewMode=view&idx=29',
    favorite: true,
  },
  {
    id: '5',
    name: '도스타코스 선릉점',
    category: Category.기타,
    distanceByWalk: DistanceByWalk['5분 내'],
    description: '멕시칸 캐주얼 그릴',
  },
  {
    id: '6',
    name: '친친',
    category: Category.중식,
    distanceByWalk: DistanceByWalk['5분 내'],
    description: 'Since 2004 편리한 교통과 주차, 그리고 관록만큼 깊은 맛과 정성으로 정통 중식의 세계를 펼쳐갑니다',
    referenceUrl: 'https://www.diningcode.com/profile.php?rid=vT6U4z6AV8u2',
  },
];

export const newRestaurantData: RestaurantDataType = {
  name: '반룡산',
  category: Category.한식,
  distanceByWalk: DistanceByWalk['30분 내'],
  description:
    '멀리 가지 않아도 됩니다. 이제 반룡산을 찾아 가까이에서. 전통 함흥음식의 남다른 맛을. 만끽 하십시오. 이것이 바로 고향인심이구나.',
  referenceUrl: 'http://banryongsan.com',
};
