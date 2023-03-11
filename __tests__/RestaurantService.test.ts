/**
 * @jest-environment jsdom
 */

import { INITIAL_RESTAURANT_DATA } from '../src/constants/data';
import RestaurantService from '../src/domains/RestaurantService';
import { filterAndSort } from '../src/domains/utils';

describe('RestaurantService 테스트', () => {
  const restaurantService = new RestaurantService([
    {
      category: '한식',
      name: '얌샘김밥',
      distance: 15,
      id: 1,
      favorite: false,
    },
  ]);

  beforeAll(() => {
    jest.spyOn(window.localStorage.__proto__, 'getItem');
    jest.spyOn(window.localStorage.__proto__, 'setItem');
    jest.spyOn(window.localStorage.__proto__, 'removeItem');

    restaurantService.add({
      category: '중식',
      name: '딘타이펑',
      distance: 30,
      description: '샤오롱바오 맛집',
      id: 0,
      favorite: false,
    });
    restaurantService.add({
      category: '중식',
      name: '명정루',
      distance: 10,
      description: '짜장면 맛집',
      id: 0,
      favorite: false,
    });
    restaurantService.add({
      category: '양식',
      name: '애슐리',
      distance: 10,
      id: 0,
      favorite: false,
    });
    restaurantService.add({
      category: '한식',
      name: '평래옥',
      distance: 5,
      link: 'pyeongraeok.com',
      id: 0,
      favorite: false,
    });
  });

  test('전체 카테고리, 이름순 정렬된 음식점 목록을 반환한다.', () => {
    expect(
      filterAndSort({ category: '전체', sorting: '이름순' }, restaurantService.getRestaurantList())
    ).toEqual([
      {
        category: '중식',
        name: '딘타이펑',
        distance: 30,
        description: '샤오롱바오 맛집',
        id: 2,
        favorite: false,
      },
      {
        category: '중식',
        name: '명정루',
        distance: 10,
        description: '짜장면 맛집',
        id: 3,
        favorite: false,
      },
      { category: '양식', name: '애슐리', distance: 10, id: 4, favorite: false },
      { category: '한식', name: '얌샘김밥', distance: 15, id: 1, favorite: false },
      {
        category: '한식',
        name: '평래옥',
        distance: 5,
        link: 'pyeongraeok.com',
        id: 5,
        favorite: false,
      },
    ]);
  });

  test('전체 카테고리, 거리순 정렬된 음식점 목록을 반환한다.', () => {
    expect(
      filterAndSort({ category: '전체', sorting: '거리순' }, restaurantService.getRestaurantList())
    ).toEqual([
      {
        category: '한식',
        name: '평래옥',
        distance: 5,
        link: 'pyeongraeok.com',
        id: 5,
        favorite: false,
      },
      {
        category: '중식',
        name: '명정루',
        distance: 10,
        description: '짜장면 맛집',
        id: 3,
        favorite: false,
      },
      { category: '양식', name: '애슐리', distance: 10, id: 4, favorite: false },
      { category: '한식', name: '얌샘김밥', distance: 15, id: 1, favorite: false },

      {
        category: '중식',
        name: '딘타이펑',
        distance: 30,
        description: '샤오롱바오 맛집',
        id: 2,
        favorite: false,
      },
    ]);
  });

  test('중식 카테고리, 거리순 정렬된 음식점 목록을 반환한다.', () => {
    expect(
      filterAndSort({ category: '중식', sorting: '거리순' }, restaurantService.getRestaurantList())
    ).toEqual([
      {
        category: '중식',
        name: '명정루',
        distance: 10,
        description: '짜장면 맛집',
        id: 3,
        favorite: false,
      },
      {
        category: '중식',
        name: '딘타이펑',
        distance: 30,
        description: '샤오롱바오 맛집',
        id: 2,
        favorite: false,
      },
    ]);
  });

  test('중식 카테고리, 이름순 정렬된 음식점 목록을 반환한다.', () => {
    expect(
      filterAndSort({ category: '중식', sorting: '이름순' }, restaurantService.getRestaurantList())
    ).toEqual([
      {
        category: '중식',
        name: '딘타이펑',
        distance: 30,
        description: '샤오롱바오 맛집',
        id: 2,
        favorite: false,
      },
      {
        category: '중식',
        name: '명정루',
        distance: 10,
        description: '짜장면 맛집',
        id: 3,
        favorite: false,
      },
    ]);
  });

  test('이름순 정렬 후 한식 카테고리인 음식점 목록을 반환한다.', () => {
    expect(
      filterAndSort({ category: '한식', sorting: '이름순' }, restaurantService.getRestaurantList())
    ).toEqual([
      { category: '한식', name: '얌샘김밥', distance: 15, id: 1, favorite: false },
      {
        category: '한식',
        name: '평래옥',
        distance: 5,
        link: 'pyeongraeok.com',
        id: 5,
        favorite: false,
      },
    ]);
  });

  test('거리순 정렬 후 한식 카테고리인 음식점 목록을 반환한다.', () => {
    expect(
      filterAndSort({ category: '한식', sorting: '거리순' }, restaurantService.getRestaurantList())
    ).toEqual([
      {
        category: '한식',
        name: '평래옥',
        distance: 5,
        link: 'pyeongraeok.com',
        id: 5,
        favorite: false,
      },
      { category: '한식', name: '얌샘김밥', distance: 15, id: 1, favorite: false },
    ]);
  });
});
