/**
 * @jest-environment jsdom
 */

import { CATEGORY_IMAGE } from '../src/constants/images';
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
    });
    restaurantService.add({
      category: '중식',
      name: '명정루',
      distance: 10,
      description: '짜장면 맛집',
    });
    restaurantService.add({ category: '양식', name: '애슐리', distance: 10 });
    restaurantService.add({
      category: '한식',
      name: '평래옥',
      distance: 5,
      link: 'pyeongraeok.com',
    });
  });

  test('전체 카테고리, 이름순 정렬된 음식점 목록을 반환한다.', () => {
    expect(restaurantService.filterAndSort()).toEqual([
      {
        category: '중식',
        name: '딘타이펑',
        distance: 30,
        description: '샤오롱바오 맛집',
        favorite: false,
        favoriteImageUrl: './favorite-icon-lined.png',
        categoryImageUrl: CATEGORY_IMAGE['중식'],
      },
      {
        category: '중식',
        name: '명정루',
        distance: 10,
        description: '짜장면 맛집',
        favorite: false,
        favoriteImageUrl: './favorite-icon-lined.png',
        categoryImageUrl: CATEGORY_IMAGE['중식'],
      },
      {
        category: '양식',
        name: '애슐리',
        distance: 10,
        favorite: false,
        favoriteImageUrl: './favorite-icon-lined.png',
        categoryImageUrl: CATEGORY_IMAGE['양식'],
      },
      {
        category: '한식',
        name: '얌샘김밥',
        distance: 15,
        favorite: false,
        favoriteImageUrl: './favorite-icon-lined.png',
        categoryImageUrl: CATEGORY_IMAGE['한식'],
      },
      {
        category: '한식',
        name: '평래옥',
        distance: 5,
        link: 'pyeongraeok.com',
        favorite: false,
        favoriteImageUrl: './favorite-icon-lined.png',
        categoryImageUrl: CATEGORY_IMAGE['한식'],
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
        favorite: false,
        favoriteImageUrl: './favorite-icon-lined.png',
        categoryImageUrl: CATEGORY_IMAGE['한식'],
      },
      {
        category: '중식',
        name: '명정루',
        distance: 10,
        description: '짜장면 맛집',
        favorite: false,
        favoriteImageUrl: './favorite-icon-lined.png',
        categoryImageUrl: CATEGORY_IMAGE['중식'],
      },
      {
        category: '양식',
        name: '애슐리',
        distance: 10,
        favorite: false,
        favoriteImageUrl: './favorite-icon-lined.png',
        categoryImageUrl: CATEGORY_IMAGE['양식'],
      },
      {
        category: '한식',
        name: '얌샘김밥',
        distance: 15,
        favorite: false,
        favoriteImageUrl: './favorite-icon-lined.png',
        categoryImageUrl: CATEGORY_IMAGE['한식'],
      },

      {
        category: '중식',
        name: '딘타이펑',
        distance: 30,
        description: '샤오롱바오 맛집',
        favorite: false,
        favoriteImageUrl: './favorite-icon-lined.png',
        categoryImageUrl: CATEGORY_IMAGE['중식'],
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
        favorite: false,
        favoriteImageUrl: './favorite-icon-lined.png',
        categoryImageUrl: CATEGORY_IMAGE['중식'],
      },
      {
        category: '중식',
        name: '딘타이펑',
        distance: 30,
        description: '샤오롱바오 맛집',
        favorite: false,
        favoriteImageUrl: './favorite-icon-lined.png',
        categoryImageUrl: CATEGORY_IMAGE['중식'],
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
        favorite: false,
        favoriteImageUrl: './favorite-icon-lined.png',
        categoryImageUrl: CATEGORY_IMAGE['중식'],
      },
      {
        category: '중식',
        name: '명정루',
        distance: 10,
        description: '짜장면 맛집',
        favorite: false,
        favoriteImageUrl: './favorite-icon-lined.png',
        categoryImageUrl: CATEGORY_IMAGE['중식'],
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
        favorite: false,
        favoriteImageUrl: './favorite-icon-lined.png',
        categoryImageUrl: CATEGORY_IMAGE['한식'],
      },
      {
        category: '한식',
        name: '평래옥',
        distance: 5,
        link: 'pyeongraeok.com',
        favorite: false,
        favoriteImageUrl: './favorite-icon-lined.png',
        categoryImageUrl: CATEGORY_IMAGE['한식'],
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
        favorite: false,
        favoriteImageUrl: './favorite-icon-lined.png',
        categoryImageUrl: CATEGORY_IMAGE['한식'],
      },
      {
        category: '한식',
        name: '얌샘김밥',
        distance: 15,
        favorite: false,
        favoriteImageUrl: './favorite-icon-lined.png',
        categoryImageUrl: CATEGORY_IMAGE['한식'],
      },
    ]);
  });
});
