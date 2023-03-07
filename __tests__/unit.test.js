/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import RestaurantList from '../src/components/main/restaurant/RestaurantList';

describe('RestaurantList 정렬 테스트', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  test('이름 순 정렬 테스트', () => {
    const currentCategory = '전체';
    const currentSortBy = 'name';
    const restaurants = [
      {
        category: '한식',
        name: '농민백암순대',
        distance: 15,
        description: '선릉에서 제일 유명한 국밥집',
        link: '',
      },
      {
        category: '양식',
        name: '버거킹',
        distance: 10,
        description: '햄버거 하면 버거킹',
        link: '',
      },
      {
        category: '양식',
        name: '맥도날드',
        distance: 5,
        description: '햄버거 하면 두번째는 맥도날드',
        link: '',
      },
    ];

    new RestaurantList(document.body, { currentCategory, currentSortBy, restaurants }).render();

    const restaurantList = document.querySelectorAll('.restaurant');
    expect(restaurantList[0]).toHaveTextContent('농민백암순대');
    expect(restaurantList[1]).toHaveTextContent('맥도날드');
    expect(restaurantList[2]).toHaveTextContent('버거킹');
  });

  test('거리 순 정렬 테스트', () => {
    const currentCategory = '전체';
    const currentSortBy = 'distance';
    const restaurants = [
      {
        category: '한식',
        name: '농민백암순대',
        distance: 15,
        description: '선릉에서 제일 유명한 국밥집',
        link: '',
      },
      {
        category: '양식',
        name: '버거킹',
        distance: 10,
        description: '햄버거 하면 버거킹',
        link: '',
      },
      {
        category: '양식',
        name: '맥도날드',
        distance: 5,
        description: '햄버거 하면 두번째는 맥도날드',
        link: '',
      },
    ];

    new RestaurantList(document.body, { currentCategory, currentSortBy, restaurants }).render();

    const restaurantList = document.querySelectorAll('.restaurant');
    expect(restaurantList[0]).toHaveTextContent('맥도날드');
    expect(restaurantList[1]).toHaveTextContent('버거킹');
    expect(restaurantList[2]).toHaveTextContent('농민백암순대');
  });
});
