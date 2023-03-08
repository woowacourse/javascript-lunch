import Restaurants from '../src/domain/Restaurants';
import { IRestaurant } from '../src/types';
import {
  getFilteredRestaurantsByCategory,
  getSortedRestaurantsByDistance,
  getSortedRestaurantsByName,
} from '../src/domain/utils';

describe('Restaurants.addRestaurant', () => {
  test('음식점을 추가하면, 음식점 리스트에 맨 뒤에 추가된다.', () => {
    const restaurants = new Restaurants();

    const restaurant: IRestaurant = {
      category: '한식',
      name: '돈카라',
      distance: '10',
      favorite: false,
    };

    restaurants.addRestaurant(restaurant);

    const restaurantList = restaurants.getRestaurants();
    const addedRestaurant = restaurantList[restaurantList.length - 1];

    expect(addedRestaurant).toEqual(restaurant);
  });
});

describe('Restaurants.getFilteredRestaurantsByCategory', () => {
  test('선택된 카테고리와 일치하는 음식점의 목록을 반환한다.', () => {
    const dummyRestaurants: IRestaurant[] = [
      {
        category: '한식',
        name: '맛이쪙 돈까스',
        distance: '10',
        description: '평양 출신의 할머니가 수십 년간 운영해온 비지 전문점',
        link: 'www.naver.com',
        favorite: false,
      },
      {
        category: '한식',
        name: '김치찌개 장인',
        distance: '5',
        favorite: false,
      },
      {
        category: '일식',
        name: '돈카라',
        distance: '5',
        favorite: false,
      },
    ];
    const restaurants = new Restaurants(dummyRestaurants);

    const filterdRestaurants = getFilteredRestaurantsByCategory(
      restaurants.getRestaurants(),
      '한식'
    );
    const expected: IRestaurant[] = [
      {
        category: '한식',
        name: '맛이쪙 돈까스',
        distance: '10',
        description: '평양 출신의 할머니가 수십 년간 운영해온 비지 전문점',
        link: 'www.naver.com',
        favorite: false,
      },
      {
        category: '한식',
        name: '김치찌개 장인',
        distance: '5',
        favorite: false,
      },
    ];

    expect(expected).toEqual(filterdRestaurants);
  });

  test(`선택된 카테고리가 '전체'라면 모든 음식점의 목록을 반환한다.`, () => {
    const dummyRestaurants: IRestaurant[] = [
      {
        category: '한식',
        name: '맛이쪙 돈까스',
        distance: '10',
        description: '평양 출신의 할머니가 수십 년간 운영해온 비지 전문점',
        link: 'www.naver.com',
        favorite: false,
      },
      {
        category: '한식',
        name: '김치찌개 장인',
        distance: '5',
        favorite: false,
      },
      {
        category: '일식',
        name: '돈카라',
        distance: '5',
        favorite: false,
      },
    ];
    const restaurants = new Restaurants(dummyRestaurants);

    const filterdRestaurants = getFilteredRestaurantsByCategory(
      restaurants.getRestaurants(),
      '전체'
    );

    expect(filterdRestaurants).toEqual(dummyRestaurants);
  });
});

describe('Restaurants.getSortedRestaurantsByName', () => {
  test('음식점 리스트를 받아, 이름순으로 정렬된 리스트를 반환한다.', () => {
    const restaurants = new Restaurants();
    const dummyRestaurants: IRestaurant[] = [
      {
        category: '한식',
        name: '맛이쪙 돈까스',
        distance: '10',
        description: '평양 출신의 할머니가 수십 년간 운영해온 비지 전문점',
        link: 'www.naver.com',
        favorite: false,
      },
      {
        category: '한식',
        name: '김치찌개 장인',
        distance: '5',
        favorite: false,
      },
      {
        category: '일식',
        name: '돈카라',
        distance: '5',
        favorite: false,
      },
    ];

    const sortedRestaurants = getSortedRestaurantsByName(dummyRestaurants);
    const expected: IRestaurant[] = [
      {
        category: '한식',
        name: '김치찌개 장인',
        distance: '5',
        favorite: false,
      },
      {
        category: '일식',
        name: '돈카라',
        distance: '5',
        favorite: false,
      },
      {
        category: '한식',
        name: '맛이쪙 돈까스',
        distance: '10',
        description: '평양 출신의 할머니가 수십 년간 운영해온 비지 전문점',
        link: 'www.naver.com',
        favorite: false,
      },
    ];

    expect(expected).toEqual(sortedRestaurants);
  });
});

describe('Restaurants.getSortedRestaurantsByDistance', () => {
  test('음식점 리스트를 받아, 거리순으로 정렬된 리스트를 반환한다.', () => {
    const restaurants = new Restaurants();
    const dummyRestaurants: IRestaurant[] = [
      {
        category: '한식',
        name: '맛이쪙 돈까스',
        distance: '10',
        description: '평양 출신의 할머니가 수십 년간 운영해온 비지 전문점',
        link: 'www.naver.com',
        favorite: false,
      },
      {
        category: '한식',
        name: '김치찌개 장인',
        distance: '5',
        favorite: false,
      },
      {
        category: '일식',
        name: '돈카라',
        distance: '5',
        favorite: false,
      },
    ];

    const sortedRestaurants = getSortedRestaurantsByDistance(dummyRestaurants);
    const expected: IRestaurant[] = [
      {
        category: '한식',
        name: '김치찌개 장인',
        distance: '5',
        favorite: false,
      },
      {
        category: '일식',
        name: '돈카라',
        distance: '5',
        favorite: false,
      },
      {
        category: '한식',
        name: '맛이쪙 돈까스',
        distance: '10',
        description: '평양 출신의 할머니가 수십 년간 운영해온 비지 전문점',
        link: 'www.naver.com',
        favorite: false,
      },
    ];

    expect(expected).toEqual(sortedRestaurants);
  });
});
