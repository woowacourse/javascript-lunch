import { IRestaurant } from '../src/types';

import {
  getFilteredRestaurantsByCategory,
  getSortedRestaurantsByDistance,
  getSortedRestaurantsByName,
} from '../src/domain/restaurantsUtils';

describe('getFilteredRestaurantsByCategory', () => {
  test('선택된 카테고리와 일치하는 음식점의 목록을 반환한다.', () => {
    const dummyRestaurants: IRestaurant[] = [
      {
        id: 1,
        category: '한식',
        name: '맛이쪙 돈까스',
        distance: '10',
        description: '평양 출신의 할머니가 수십 년간 운영해온 비지 전문점',
        link: 'www.naver.com',
        isFavorite: false,
      },
      {
        id: 2,
        category: '한식',
        name: '김치찌개 장인',
        distance: '5',
        isFavorite: false,
      },
      {
        id: 3,
        category: '일식',
        name: '돈카라',
        distance: '5',
        isFavorite: false,
      },
    ];

    const filterdRestaurants = getFilteredRestaurantsByCategory(dummyRestaurants, '한식');
    const expected: IRestaurant[] = [
      {
        id: 1,
        category: '한식',
        name: '맛이쪙 돈까스',
        distance: '10',
        description: '평양 출신의 할머니가 수십 년간 운영해온 비지 전문점',
        link: 'www.naver.com',
        isFavorite: false,
      },
      {
        id: 2,
        category: '한식',
        name: '김치찌개 장인',
        distance: '5',
        isFavorite: false,
      },
    ];

    expect(expected).toEqual(filterdRestaurants);
  });

  test(`선택된 카테고리가 '전체'라면 모든 음식점의 목록을 반환한다.`, () => {
    const dummyRestaurants: IRestaurant[] = [
      {
        id: 1,
        category: '한식',
        name: '맛이쪙 돈까스',
        distance: '10',
        description: '평양 출신의 할머니가 수십 년간 운영해온 비지 전문점',
        link: 'www.naver.com',
        isFavorite: false,
      },
      {
        id: 2,
        category: '한식',
        name: '김치찌개 장인',
        distance: '5',
        isFavorite: false,
      },
      {
        id: 3,
        category: '일식',
        name: '돈카라',
        distance: '5',
        isFavorite: false,
      },
    ];

    const filterdRestaurants = getFilteredRestaurantsByCategory(dummyRestaurants, '전체');

    expect(filterdRestaurants).toEqual(dummyRestaurants);
  });
});

describe('getSortedRestaurantsByName', () => {
  test('음식점 리스트를 받아, 이름순으로 정렬된 리스트를 반환한다.', () => {
    const dummyRestaurants: IRestaurant[] = [
      {
        id: 1,
        category: '한식',
        name: '맛이쪙 돈까스',
        distance: '10',
        description: '평양 출신의 할머니가 수십 년간 운영해온 비지 전문점',
        link: 'www.naver.com',
        isFavorite: false,
      },
      {
        id: 2,
        category: '한식',
        name: '김치찌개 장인',
        distance: '5',
        isFavorite: false,
      },
      {
        id: 3,
        category: '일식',
        name: '돈카라',
        distance: '5',
        isFavorite: false,
      },
    ];

    const sortedRestaurants = getSortedRestaurantsByName(dummyRestaurants);
    const expected: IRestaurant[] = [
      {
        id: 2,
        category: '한식',
        name: '김치찌개 장인',
        distance: '5',
        isFavorite: false,
      },
      {
        id: 3,
        category: '일식',
        name: '돈카라',
        distance: '5',
        isFavorite: false,
      },
      {
        id: 1,
        category: '한식',
        name: '맛이쪙 돈까스',
        distance: '10',
        description: '평양 출신의 할머니가 수십 년간 운영해온 비지 전문점',
        link: 'www.naver.com',
        isFavorite: false,
      },
    ];

    expect(expected).toEqual(sortedRestaurants);
  });
});

describe('getSortedRestaurantsByDistance', () => {
  test('음식점 리스트를 받아, 거리순으로 정렬된 리스트를 반환한다.', () => {
    const dummyRestaurants: IRestaurant[] = [
      {
        id: 1,
        category: '한식',
        name: '맛이쪙 돈까스',
        distance: '10',
        description: '평양 출신의 할머니가 수십 년간 운영해온 비지 전문점',
        link: 'www.naver.com',
        isFavorite: false,
      },
      {
        id: 2,
        category: '한식',
        name: '김치찌개 장인',
        distance: '5',
        isFavorite: false,
      },
      {
        id: 3,
        category: '일식',
        name: '돈카라',
        distance: '5',
        isFavorite: false,
      },
    ];

    const sortedRestaurants = getSortedRestaurantsByDistance(dummyRestaurants);
    const expected: IRestaurant[] = [
      {
        id: 2,
        category: '한식',
        name: '김치찌개 장인',
        distance: '5',
        isFavorite: false,
      },
      {
        id: 3,
        category: '일식',
        name: '돈카라',
        distance: '5',
        isFavorite: false,
      },
      {
        id: 1,
        category: '한식',
        name: '맛이쪙 돈까스',
        distance: '10',
        description: '평양 출신의 할머니가 수십 년간 운영해온 비지 전문점',
        link: 'www.naver.com',
        isFavorite: false,
      },
    ];

    expect(expected).toEqual(sortedRestaurants);
  });
});
