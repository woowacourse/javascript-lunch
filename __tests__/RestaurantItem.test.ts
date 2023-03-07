/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import RestaurantItem from '../src/view/components/RestaurantItem';
import dummyRestaurants from './dummyRestaurants';
import { screen } from '@testing-library/dom';
import { $ } from '../src/util/querySelector';

describe('레스토랑 항목(RestaurantItem) 컴포넌트 랜더링 테스트', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="restaurant-list"></div>';
  });

  test('한식 음식점에 해당하는 컴포넌트가 랜더링되었을 때, 예상했던 랜더링 내용이 포함되어 있어야 한다.', () => {
    new RestaurantItem({
      parentElement: $('#restaurant-list'),
      restaurant: dummyRestaurants[0],
    });

    expect(screen.queryByText('한옥식당')).toBeInTheDocument();
    expect(
      screen.queryByText(
        '전통적인 한식과 한옥의 아름다움을 동시에 느낄 수 있는 곳'
      )
    ).toBeInTheDocument();
  });

  test('일식 음식점에 해당하는 컴포넌트가 랜더링되었을 때, 예상했던 랜더링 내용이 포함되어 있어야 한다.', () => {
    new RestaurantItem({
      parentElement: $('#restaurant-list'),
      restaurant: dummyRestaurants[1],
    });

    expect(screen.queryByText('삼베스시')).toBeInTheDocument();
    expect(
      screen.queryByText(
        '신선한 재료와 정교한 손질법으로 만든 최상의 회와 일본식 요리를 즐길 수 있는 일식 전문점'
      )
    ).toBeInTheDocument();
  });
});
