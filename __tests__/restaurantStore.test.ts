import { restaurantStore } from '../src/model/restaurantStore';
import { Restaurant } from '../src/interfaces/RestaurantInput';
import { Category, Order } from '../src/constants/enum';

const sampleData: Restaurant[] = [
  {
    id: 1,
    favorite: false,
    category: '한식',
    name: '얌샘김밥',
    distance: '5',
    description: '정말 마이따 마이따!정말 마이따',
    link: 'https://naver.com',
  },
  {
    id: 2,
    favorite: true,
    category: '한식',
    name: '고봉김밥',
    distance: '15',
    description: '정말 고봉이다.',
    link: 'https://naver.com',
  },
  {
    id: 3,
    favorite: false,
    category: '한식',
    name: '김치 맛 세상',
    distance: '10',
    description: '김치!',
    link: 'https://naver.com',
  },
  {
    id: 4,
    favorite: false,
    category: '중식',
    name: '중화반점',
    distance: '20',
    description: '정말!',
    link: 'https://naver.com',
  },
];

describe('음식점 리스트 필터 및 정렬 확인', () => {
  test('한식인 음식 리스트는 총 3개이다.', () => {
    const filteredRestaurants = restaurantStore.filterItems(sampleData, Category.Korean); //?

    expect(filteredRestaurants.length).toBe(3);
  });

  test('중식인 음식 리스트는 총 1개이다.', () => {
    const filteredRestaurants = restaurantStore.filterItems(sampleData, Category.Chinese); //?

    expect(filteredRestaurants.length).toBe(1);
  });

  test('이름 순으로 정렬했을 때 id의 순서는 [2, 3, 1, 4]이다. ', () => {
    const sortedRestaurants = restaurantStore.sortItems(sampleData, Order.Name);
    const idList = sortedRestaurants.map((restaurant: Restaurant) => restaurant.id);

    expect(idList).toEqual([2, 3, 1, 4]);
  });

  test('거리 순으로 정렬했을 때 id의 순서는 [1, 3, 2, 4]이다. ', () => {
    const sortedRestaurants = restaurantStore.sortItems(sampleData, Order.Distance);
    const idList = sortedRestaurants.map((restaurant: Restaurant) => restaurant.id);

    expect(idList).toEqual([1, 3, 2, 4]);
  });
});
