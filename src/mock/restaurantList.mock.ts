import { IRestaurant } from '@/types/Restaurant';
const restaurantListMock: IRestaurant[] = [
  {
    id: 1,
    name: '피양콩할머니',
    category: '한식',
    distance: 10,
    description: `평양 출신의 할머니가 수십 년간 운영해온 비지 전문점 피양콩 할마니. 두부를 빼지 않은
되비지를 맛볼 수 있는 곳으로, ‘피양’은 평안도 사투리로 ‘평양’을 의미한다. 딸과 함께
운영하는 이곳에선 맷돌로 직접 간 콩만을 사용하며, 일체의 조미료를 넣지 않은 건강식을
선보인다. 콩비지와 피양 만두가 이곳의 대표 메뉴지만, 할머니가 옛날 방식을 고수하며
만들어내는 비지전골 또한 이 집의 역사를 느낄 수 있는 특별한 메뉴다. 반찬은 손님들이
먹고 싶은 만큼 덜어 먹을 수 있게 준비돼 있다.`,
    link: 'https://www.naver.com',
    isFavorite: true,
  },
  {
    id: 2,
    name: '친친',
    category: '중식',
    distance: 5,
    description: `Since 2004 편리한 교통과 주차, 그리고 관록만큼 깊은 맛과 정성으로 정통 중식의 세계를
    펼쳐갑니다.`,
    link: 'https://www.naver.com',
    isFavorite: true,
  },
  {
    id: 3,
    name: '잇쇼우',
    category: '일식',
    distance: 10,
    description: `잇쇼우는 정통 자가제면 사누끼 우동이 대표메뉴입니다. 기술은 정성을 이길 수 없다는
    신념으로 모든 음식에 최선을 다하는 잇쇼우는 고객 한분 한분께 최선을 다하겠습니다`,
    link: 'https://www.naver.com',
    isFavorite: true,
  },
  {
    id: 4,
    name: '이태리키친',
    category: '양식',
    distance: 20,
    description: `늘 변화를 추구하는 이태리키친입니다.`,
    link: 'https://www.naver.com',
    isFavorite: false,
  },
  {
    id: 5,
    name: '호야빈 삼성점',
    category: '아시안',
    distance: 15,
    description: `푸짐한 양에 국물이 일품인 쌀국수`,
    link: 'https://www.naver.com',
    isFavorite: false,
  },
  {
    id: 6,
    name: '도스타코스 선릉점',
    category: '기타',
    distance: 5,
    description: `멕시칸 캐주얼 그릴`,
    link: 'https://www.naver.com',
    isFavorite: false,
  },
  {
    id: 6,
    name: '싸다김밥',
    category: '한식',
    distance: 10,
    description: `싸다김밥은 전 메뉴를 직접 생산한 특제 소스로 요리해 일관된 맛을 만들어 냅니다. 창업 전 꼭 모든 경쟁브랜드를 들려 맛을 꼭 비교해 보세요. 3,000원 싸다김밥을 기준으로 하루에 김밥을 200줄만 판매한다고 해도 60만원 가량의 기본 매출이 발생합니다.`,
    link: 'https://ssadagimbab.modoo.at/?link=4hmxgtiw',
    isFavorite: false,
  },
];

export default restaurantListMock;
