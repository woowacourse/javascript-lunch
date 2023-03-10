import type { State } from '../types/restaurantTypes';
import { DEFAULT_CATEGORY, SORTING_OPTION } from './constant';

const DEFAULT_RESTAURANT_DATA: State = {
  filter: DEFAULT_CATEGORY,
  sortingOption: SORTING_OPTION.NAME,
  isModalOpen: false,
  restaurants: [
    {
      id: 1,
      name: '피양콩할마니',
      category: '한식',
      distance: 10,
      description: '평양 출신의 할머니가 수십 년간 운영해온 비지 전문점 피양콩 할마니.',
      isLike: true,
    },
    {
      id: 2,
      name: '친친',
      category: '중식',
      distance: 5,
      description: 'Since 2004 편리한 교통과 주차, 그리고 관록만큼 깊은 맛과 정성으로 정통 중식의 세계를 펼쳐갑니다',
      isLike: true,
    },
    {
      id: 3,
      name: '잇쇼우',
      category: '일식',
      distance: 10,
      description: '잇쇼우는 정통 자가제면 사누끼 우동이 대표메뉴입니다.',
      isLike: true,
    },
    {
      id: 4,
      name: '이태리키친',
      category: '양식',
      distance: 20,
      description: '늘 변화를 추구하는 이태리키친입니다.',
      isLike: false,
    },
    {
      id: 5,
      name: '쌀국수',
      category: '아시안',
      distance: 20,
      description: '쌀국수 맛있어요.',
      isLike: false,
    },
    {
      id: 6,
      name: '도스타코스',
      category: '기타',
      distance: 30,
      description: '타코 맛있어요!.',
      isLike: false,
    },
    {
      id: 7,
      name: '오토상',
      category: '일식',
      distance: 5,
      description: '스시 맛있어요!.',
      isLike: true,
    },
    {
      id: 8,
      name: '곤방와',
      category: '일식',
      distance: 15,
      description: '라멘 전문 레스토랑!.',
      isLike: true,
    },
  ],
};

export default DEFAULT_RESTAURANT_DATA;
