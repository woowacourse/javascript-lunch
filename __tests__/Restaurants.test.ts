import Restaurants from '../src/domain/Restaurants';
import { Restaurant } from '../src/types';

test('Restaurants.addRestaurant', () => {
  const restaurants = new Restaurants();

  const restaurant: Restaurant = {
    category: '한식',
    name: '돈카라',
    distance: '10',
  };

  restaurants.addRestaurant(restaurant);
  const addedRestaurant = restaurants.getRestaurants()[0];

  expect(addedRestaurant).toEqual(restaurant);
});

describe('Restaurants.getFilteredRestaurantsByCategory', () => {
  test('선택된 카테고리와 일치하는 음식점의 목록을 반환한다.', () => {
    const dummy: Restaurant[] = [
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
    const restaurants = new Restaurants();
    dummy.forEach((v) => restaurants.addRestaurant(v));

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
});

describe('Restaurants.getSortedRestaurantsByName', () => {
  test('', () => {
    const dummy: Restaurant[] = [
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
    const restaurants = new Restaurants();
    dummy.forEach((v) => restaurants.addRestaurant(v));

    const sortedRestaurants = restaurants.getSortedRestaurantsByName();
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
  test('', () => {
    const dummy: Restaurant[] = [
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
    const restaurants = new Restaurants();
    dummy.forEach((v) => restaurants.addRestaurant(v));

    const sortedRestaurants = restaurants.getSortedRestaurantsByDistance();
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
