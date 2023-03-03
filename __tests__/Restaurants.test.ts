import Restaurants from '../src/domain/Restaurants';
import { Restaurant } from '../src/types';

describe('Restaurants.addRestaurant', () => {
  test('음식점을 추가하면, 음식점 리스트에 맨 뒤에 추가된다.', () => {
    const restaurants = new Restaurants();

    const restaurant: Restaurant = {
      category: '한식',
      name: '돈카라',
      distance: '10',
    };

    restaurants.addRestaurant(restaurant);

    const restaurantList = restaurants.getRestaurants();
    const addedRestaurant = restaurantList[restaurantList.length - 1];

    expect(addedRestaurant).toEqual(restaurant);
  });
});

describe('Restaurants.getFilteredRestaurantsByCategory', () => {
  test('선택된 카테고리와 일치하는 음식점의 목록을 반환한다.', () => {
    const dummyRestaurants: Restaurant[] = [
      {
        category: '한식',
        name: '맛이쪙 돈까스',
        distance: '10',
        description: '평양 출신의 할머니가 수십 년간 운영해온 비지 전문점',
        link: 'www.naver.com',
      },
      {
        category: '한식',
        name: '김치찌개 장인',
        distance: '5',
      },
      {
        category: '일식',
        name: '돈카라',
        distance: '5',
      },
    ];
    const restaurants = new Restaurants(dummyRestaurants);

    const filterdRestaurants = restaurants.getFilteredRestaurantsByCategory('한식');
    const expected: Restaurant[] = [
      {
        category: '한식',
        name: '맛이쪙 돈까스',
        distance: '10',
        description: '평양 출신의 할머니가 수십 년간 운영해온 비지 전문점',
        link: 'www.naver.com',
      },
      {
        category: '한식',
        name: '김치찌개 장인',
        distance: '5',
      },
    ];

    expect(expected).toEqual(filterdRestaurants);
  });

  test(`선택된 카테고리가 '전체'라면 모든 음식점의 목록을 반환한다.`, () => {
    const dummyRestaurants: Restaurant[] = [
      {
        category: '한식',
        name: '맛이쪙 돈까스',
        distance: '10',
        description: '평양 출신의 할머니가 수십 년간 운영해온 비지 전문점',
        link: 'www.naver.com',
      },
      {
        category: '한식',
        name: '김치찌개 장인',
        distance: '5',
      },
      {
        category: '일식',
        name: '돈카라',
        distance: '5',
      },
    ];
    const restaurants = new Restaurants(dummyRestaurants);

    const filterdRestaurants = restaurants.getFilteredRestaurantsByCategory('전체');

    expect(filterdRestaurants).toEqual(dummyRestaurants);
  });
});

describe('Restaurants.getSortedRestaurantsByName', () => {
  test('음식점 리스트를 받아, 이름순으로 정렬된 리스트를 반환한다.', () => {
    const restaurants = new Restaurants();
    const dummyRestaurants: Restaurant[] = [
      {
        category: '한식',
        name: '맛이쪙 돈까스',
        distance: '10',
        description: '평양 출신의 할머니가 수십 년간 운영해온 비지 전문점',
        link: 'www.naver.com',
      },
      {
        category: '한식',
        name: '김치찌개 장인',
        distance: '5',
      },
      {
        category: '일식',
        name: '돈카라',
        distance: '5',
      },
    ];

    const sortedRestaurants = restaurants.getSortedRestaurantsByName(dummyRestaurants);
    const expected: Restaurant[] = [
      {
        category: '한식',
        name: '김치찌개 장인',
        distance: '5',
      },
      {
        category: '일식',
        name: '돈카라',
        distance: '5',
      },
      {
        category: '한식',
        name: '맛이쪙 돈까스',
        distance: '10',
        description: '평양 출신의 할머니가 수십 년간 운영해온 비지 전문점',
        link: 'www.naver.com',
      },
    ];

    expect(expected).toEqual(sortedRestaurants);
  });
});

describe('Restaurants.getSortedRestaurantsByDistance', () => {
  test('음식점 리스트를 받아, 거리순으로 정렬된 리스트를 반환한다.', () => {
    const restaurants = new Restaurants();
    const dummyRestaurants: Restaurant[] = [
      {
        category: '한식',
        name: '맛이쪙 돈까스',
        distance: '10',
        description: '평양 출신의 할머니가 수십 년간 운영해온 비지 전문점',
        link: 'www.naver.com',
      },
      {
        category: '한식',
        name: '김치찌개 장인',
        distance: '5',
      },
      {
        category: '일식',
        name: '돈카라',
        distance: '5',
      },
    ];

    const sortedRestaurants = restaurants.getSortedRestaurantsByDistance(dummyRestaurants);
    const expected: Restaurant[] = [
      {
        category: '한식',
        name: '김치찌개 장인',
        distance: '5',
      },
      {
        category: '일식',
        name: '돈카라',
        distance: '5',
      },
      {
        category: '한식',
        name: '맛이쪙 돈까스',
        distance: '10',
        description: '평양 출신의 할머니가 수십 년간 운영해온 비지 전문점',
        link: 'www.naver.com',
      },
    ];

    expect(expected).toEqual(sortedRestaurants);
  });
});
