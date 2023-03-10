/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';

import RestaurantList from '../src/components/RestaurantList';
import RestaurantListItem from '../src/components/RestaurantListItem';
import RestaurantRegisterModal from '../src/components/RestaurantRegisterModal';
import RestaurantDetailModal from '../src/components/RestaurantDetailModal';
import RestaurantFilter from '../src/components/RestaurantFilter';
import RestaurantTab from '../src/components/RestaurantTab';

import { sampleRestaurants } from '../src/domain/sampleRestaurants';

describe('컴포넌트 렌더링 테스트', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  test('화면에 RestaurantListItem을 렌더링한다.', () => {
    const restaurant = {
      category: '일식',
      name: '지구당',
      distance: 5,
      description: '상세 설명',
      link: 'link',
    };

    const listItem = /* html */ `
    <restaurant-list-item
      category="${restaurant.category}"
      restaurantName="${restaurant.name}"
      distance="${restaurant.distance}"
      description="${restaurant.description}"
    ></restaurant-list-item>`;

    document.body.insertAdjacentHTML('beforeend', listItem);

    expect(screen.getByText('지구당')).toBeInTheDocument();
  });

  test('화면에 RestaurantList를 렌더링한다.', () => {
    document.body.insertAdjacentHTML('beforeend', '<restaurant-list></restaurant-list>');
    document.querySelector('restaurant-list').render(sampleRestaurants);

    const isRendered = sampleRestaurants.every((restaurant) => screen.getByText(restaurant.name));

    expect(isRendered).toBe(true);
  });

  test('화면에 RestaurantRegisterModal을 렌더링한다.', () => {
    document.body.insertAdjacentHTML(
      'beforeend',
      `<custom-modal><restaurant-register-modal></restaurant-register-modal></custom-modal>`
    );

    expect(screen.getByText('새로운 음식점')).toBeInTheDocument();
  });

  test('화면에 RestaurantDetailModal을 렌더링한다.', () => {
    document.body.insertAdjacentHTML(
      'beforeend',
      `<custom-modal><restaurant-detail-modal></restaurant-detail-modal></custom-modal>`
    );

    expect(screen.getByText('삭제하기')).toBeInTheDocument();
  });

  test('화면에 RestaurantFilter를 렌더링한다.', () => {
    document.body.insertAdjacentHTML('beforeend', `<restaurant-filter></restaurant-filter>`);

    const categoryFilter = screen.getByDisplayValue('전체');
    const sortingFilter = screen.getByDisplayValue('등록순');

    expect(categoryFilter).toBeInTheDocument();
    expect(sortingFilter).toBeInTheDocument();
  });

  test('화면에 RestaurantTab을 렌더링한다.', () => {
    document.body.insertAdjacentHTML('beforeend', `<restaurant-tab></restaurant-tab>`);

    const allRestaurantTab = screen.getByText('모든 음식점');
    const favoriteRestaurantTab = screen.getByText('자주 가는 음식점');

    expect(allRestaurantTab).toBeInTheDocument();
    expect(favoriteRestaurantTab).toBeInTheDocument();
  });
});
