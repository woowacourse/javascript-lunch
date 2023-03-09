/**
 * @jest-environment jsdom
 */

import RestaurantService from '../src/domains/RestaurantService';

describe('RestaurantService 테스트', () => {
  const restaurantService = new RestaurantService();

  beforeAll(() => {
    jest.spyOn(window.localStorage.__proto__, 'getItem');
    jest.spyOn(window.localStorage.__proto__, 'setItem');
    jest.spyOn(window.localStorage.__proto__, 'removeItem');

    restaurantService.add({ category: '한식', name: '얌샘김밥', distance: 15 });
    restaurantService.add({
      category: '중식',
      name: '딘타이펑',
      distance: 30,
      description: '샤오롱바오 맛집',
      favoriteImageUrl: './favorite-icon-lined.png',
    });
    restaurantService.add({
      category: '중식',
      name: '명정루',
      distance: 10,
      description: '짜장면 맛집',
      favoriteImageUrl: './favorite-icon-lined.png',
    });
    restaurantService.add({ category: '양식', name: '애슐리', distance: 10 });
    restaurantService.add({
      category: '한식',
      name: '평래옥',
      distance: 5,
      link: 'pyeongraeok.com',
      favoriteImageUrl: './favorite-icon-lined.png',
    });
  });

  test('전체 카테고리, 이름순 정렬된 음식점 목록을 반환한다.', () => {
    expect(restaurantService.filterAndSort()).toEqual([
      {
        category: '중식',
        name: '딘타이펑',
        distance: 30,
        description: '샤오롱바오 맛집',
        favoriteImageUrl: './favorite-icon-lined.png',
      },
      {
        category: '중식',
        name: '명정루',
        distance: 10,
        description: '짜장면 맛집',
        favoriteImageUrl: './favorite-icon-lined.png',
      },
      {
        category: '양식',
        name: '애슐리',
        distance: 10,
        favoriteImageUrl: './favorite-icon-lined.png',
      },
      {
        category: '한식',
        name: '얌샘김밥',
        distance: 15,
        favoriteImageUrl: './favorite-icon-lined.png',
      },
      {
        category: '한식',
        name: '평래옥',
        distance: 5,
        link: 'pyeongraeok.com',
        favoriteImageUrl: './favorite-icon-lined.png',
      },
    ]);
  });

  test('전체 카테고리, 거리순 정렬된 음식점 목록을 반환한다.', () => {
    restaurantService.setCurrentSortingCriterion('distance');

    expect(restaurantService.filterAndSort()).toEqual([
      {
        category: '한식',
        name: '평래옥',
        distance: 5,
        link: 'pyeongraeok.com',
        favoriteImageUrl: './favorite-icon-lined.png',
      },
      {
        category: '중식',
        name: '명정루',
        distance: 10,
        description: '짜장면 맛집',
        favoriteImageUrl: './favorite-icon-lined.png',
      },
      {
        category: '양식',
        name: '애슐리',
        distance: 10,
        favoriteImageUrl: './favorite-icon-lined.png',
      },
      {
        category: '한식',
        name: '얌샘김밥',
        distance: 15,
        favoriteImageUrl: './favorite-icon-lined.png',
      },

      {
        category: '중식',
        name: '딘타이펑',
        distance: 30,
        description: '샤오롱바오 맛집',
        favoriteImageUrl: './favorite-icon-lined.png',
      },
    ]);
  });

  test('중식 카테고리, 거리순 정렬된 음식점 목록을 반환한다.', () => {
    restaurantService.setCurrentCategory('중식');

    expect(restaurantService.filterAndSort()).toEqual([
      {
        category: '중식',
        name: '명정루',
        distance: 10,
        description: '짜장면 맛집',
        favoriteImageUrl: './favorite-icon-lined.png',
      },
      {
        category: '중식',
        name: '딘타이펑',
        distance: 30,
        description: '샤오롱바오 맛집',
        favoriteImageUrl: './favorite-icon-lined.png',
      },
    ]);
  });

  test('중식 카테고리, 이름순 정렬된 음식점 목록을 반환한다.', () => {
    restaurantService.setCurrentSortingCriterion('name');

    expect(restaurantService.filterAndSort()).toEqual([
      {
        category: '중식',
        name: '딘타이펑',
        distance: 30,
        description: '샤오롱바오 맛집',
        favoriteImageUrl: './favorite-icon-lined.png',
      },
      {
        category: '중식',
        name: '명정루',
        distance: 10,
        description: '짜장면 맛집',
        favoriteImageUrl: './favorite-icon-lined.png',
      },
    ]);
  });

  test('이름순 정렬 후 한식 카테고리인 음식점 목록을 반환한다.', () => {
    restaurantService.setCurrentSortingCriterion('name');
    restaurantService.setCurrentCategory('한식');

    expect(restaurantService.filterAndSort()).toEqual([
      {
        category: '한식',
        name: '얌샘김밥',
        distance: 15,
        favoriteImageUrl: './favorite-icon-lined.png',
      },
      {
        category: '한식',
        name: '평래옥',
        distance: 5,
        link: 'pyeongraeok.com',
        favoriteImageUrl: './favorite-icon-lined.png',
      },
    ]);
  });

  test('거리순 정렬 후 한식 카테고리인 음식점 목록을 반환한다.', () => {
    restaurantService.setCurrentSortingCriterion('distance');

    expect(restaurantService.filterAndSort()).toEqual([
      {
        category: '한식',
        name: '평래옥',
        distance: 5,
        link: 'pyeongraeok.com',
        favoriteImageUrl: './favorite-icon-lined.png',
      },
      {
        category: '한식',
        name: '얌샘김밥',
        distance: 15,
        favoriteImageUrl: './favorite-icon-lined.png',
      },
    ]);
  });
});
