import { Restaurant } from '../types/types';

const INITIAL_RESTAURANT_DATA: Restaurant[] = [
  {
    category: '중식',
    name: '찐친',
    distance: 5,
    description: '찐친들이랑 가는 중국집',
    link: '',
    favorite: false,
    id: 1,
  },
  {
    category: '기타',
    name: '커피베네',
    distance: 5,
    description: '성담빌딩 건물에 있는 커피베네',
    link: '',
    favorite: false,
    id: 2,
  },
  {
    category: '기타',
    name: '스타벅스 선릉역점',
    distance: 5,
    description: '면담하기 좋은 곳 스타벅스 시끌벅적함',
    link: '',
    favorite: false,
    id: 3,
  },
  {
    category: '한식',
    name: '영동칼국수',
    distance: 15,
    description:
      '멀긴 한데 그래도 9,000원이라는 가격에 저렴하게 적게 먹을 수 있는 곳. 지갑 다이어트하기 좋은 곳',
    link: '',
    favorite: false,
    id: 4,
  },
  {
    category: '한식',
    name: '덮밥이맛있는집',
    distance: 15,
    description: '영동칼국수집 옆에 있는 연어덮밥, 스테이크덮밥 등을 파는 덮밥 집',
    link: '',
    favorite: false,
    id: 5,
  },
  {
    category: '일식',
    name: '돈카레',
    distance: 10,
    description: '도밥이 좋아하는 돈카레',
    link: '',
    favorite: false,
    id: 6,
  },
  {
    category: '중식',
    name: '우육면가',
    distance: 10,
    description: '크론이 한 번도 안 먹어 본 우육면가',
    link: '',
    favorite: false,
    id: 7,
  },
  {
    category: '한식',
    name: '시골밥상머리',
    distance: 10,
    description: '시골에서 주는 밥처럼 나오는 상머리',
    link: '',
    favorite: false,
    id: 8,
  },
];

export { INITIAL_RESTAURANT_DATA };
