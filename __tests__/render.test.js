/**
 * @jest-environment jsdom
 */
import '../src/constants/images';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';
import { RestaurantItem } from '../src/components/RestaurantItem';
import { RestaurantList } from '../src/components/RestaurantList';

beforeEach(() => {
  document.body.innerHTML = `<ul class="restaurant-list" data-testid="restaurant-list"></ul>`;
});

describe('UI 테스트', () => {
  test('한 개의 음식점 추가 시 목록에 추가된다.', () => {
    const restaurants = [{ category: '한식', name: '필동면옥', distance: 5 }];
    const restaurantList = RestaurantList(restaurants);
    const restaurantListContainer = document.querySelector('.restaurant-list');

    restaurantListContainer.insertAdjacentHTML('beforeend', restaurantList);

    expect(screen.getByText('필동면옥')).toBeInTheDocument();
  });

  test('여러 개의 음식점 추가 시 목록에 추가된다.', () => {
    const restaurants = [
      { category: '한식', name: '우래옥', distance: 5 },
      { category: '중식', name: '딘타이펑', distance: 30, description: '샤오롱바오 맛집' },
      { category: '중식', name: '명정루', distance: 10, description: '짜장면 맛집' },
      { category: '양식', name: '애슐리', distance: 10 },
    ];
    const restaurantList = RestaurantList(restaurants);
    const restaurantListContainer = document.querySelector('.restaurant-list');

    restaurantListContainer.insertAdjacentHTML('beforeend', restaurantList);

    expect(screen.getByTestId('restaurant-list').childElementCount).toBe(4);
  });

  test('RestaurantItem 테스트', () => {
    const restaurant = { category: '한식', name: '우래옥', distance: 5 };
    const restaurantItem = RestaurantItem(restaurant);
    const restaurantListContainer = document.querySelector('.restaurant-list');

    restaurantListContainer.insertAdjacentHTML('beforeend', restaurantItem);

    expect(screen.getByText('우래옥')).toBeInTheDocument();
  });
});
