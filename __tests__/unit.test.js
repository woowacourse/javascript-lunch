/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import RestaurantList from '../src/components/RestaurantList';

describe('RestaurantList 기능 테스트', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });
  test('이름 순 정렬 테스트', () => {
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
    const category = '전체';
    const sortBy = 'name';

    new RestaurantList({ $parent: document.body, restaurants, category, sortBy }).render();
    const restaurantList = document.querySelectorAll('.restaurant');

    expect(restaurantList[0]).toHaveTextContent('농민백암순대');
    expect(restaurantList[1]).toHaveTextContent('맥도날드');
    expect(restaurantList[2]).toHaveTextContent('버거킹');
  });

  test('거리 순 정렬 테스트', () => {
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
    const category = '전체';
    const sortBy = 'distance';

    new RestaurantList({ $parent: document.body, restaurants, category, sortBy }).render();
    const restaurantList = document.querySelectorAll('.restaurant');

    expect(restaurantList[0]).toHaveTextContent('맥도날드');
    expect(restaurantList[1]).toHaveTextContent('버거킹');
    expect(restaurantList[2]).toHaveTextContent('농민백암순대');
  });
});
