import { IRestaurantInfo } from './Restaurant';

const mockingData: readonly IRestaurantInfo[] = Object.freeze([
  {
    id: 1,
    category: '한식',
    name: '피양콩할마니',
    distanceFromCampus: 10,
    description:
      '평양 출신의 할머니가 수십 년간 운영해온 비지 전문점 피양콩 할마니. 두부를 빼지 않은 되비지를 맛볼 수 있는곳으로,‘피양’은 평안도 사투리로 ‘평양’을 의미한다. 딸과 함께 운영하는 이곳에선 맷돌로 직접 간 콩만을 사용하며, 일체의 조미료를 넣지 않은 건강식을 선보인다. 콩비지와 피양 만두가 이곳의 대표메뉴지만, 할머니가 옛날 방식을 고수하며 만들어내는 비지전골 또한 이 집의 역사를 느낄 수 있는 특별한 메뉴다. 반찬은 손님들이 먹고 싶은 만큼 덜어 먹을 수 있게 준비돼 있다.',
  },
  {
    id: 2,
    category: '한식',
    name: '농민백암순대 본점',
    distanceFromCampus: 15,
    description: '선릉 수요미식회 맛집 순대국밥이 맛있는 농민 백암순대',
  },
  {
    id: 3,
    category: '중식',
    name: '친친',
    distanceFromCampus: 5,
    description: 'Since 2004 편리한 교통과 주차, 그리고 관록만큼 깊은 맛과 정성으로 정통 중식의 세계를 펼쳐갑니다',
  },
  {
    id: 4,
    category: '중식',
    name: '영빈관',
    distanceFromCampus: 10,
    description: '아 영빈관 먹고 싶다',
  },
  {
    id: 5,
    category: '일식',
    name: '잇쇼우',
    distanceFromCampus: 10,
    description:
      '잇쇼우는 정통 자가제면 사누끼 우동이 대표메뉴입니다. 기술은 정성을 이길 수 없다는 신념으로 모든 음식에 최선을 다하는 잇쇼우는 고객 한분 한분께 최선을 다하겠습니다',
  },
  {
    id: 6,
    category: '양식',
    name: '이태리키친',
    distanceFromCampus: 20,
    description: '늘 변화를 추구하는 이태리키친입니다.',
  },
  {
    id: 7,
    category: '기타',
    name: '도스타코스 선릉점',
    distanceFromCampus: 5,
    description: '멕시칸 캐주얼 그릴',
  },
]);

export default mockingData;
