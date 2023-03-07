/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import RestaurantList from '../src/view/RestaurantList';
import dummyRestaurants from './dummyRestaurants';
import { screen } from '@testing-library/dom';
import { $ } from '../src/util/querySelector';

describe('레스토랑 리스트(RestaurantList) 컴포넌트 랜더링 테스트', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="test-root"></div>';
  });

  test('음식점들이 주어지면, 음식점들이 모두 랜더링 되어야 한다.', () => {
    new RestaurantList({
      parentElement: $('#test-root'),
      restaurants: [
        dummyRestaurants[0],
        dummyRestaurants[2],
        dummyRestaurants[4],
      ],
    });

    expect(screen.queryByText('한옥식당')).toBeInTheDocument();
    expect(
      screen.queryByText(
        '전통적인 한식과 한옥의 아름다움을 동시에 느낄 수 있는 곳'
      )
    ).toBeInTheDocument();
    expect(screen.queryByText('중화요리전문점 짜장바구니')).toBeInTheDocument();
    expect(
      screen.queryByText(
        '짜장면, 짬뽕, 탕수육 등 대표적인 중화요리와 함께 새로운 중국 요리도 만나볼 수 있는 중식 전문점'
      )
    ).toBeInTheDocument();
    expect(screen.queryByText('루왕탕수육')).toBeInTheDocument();
    expect(
      screen.queryByText(
        '육즙이 풍부한 탕수육과 함께 고추가루를 올린 루왕탕수육을 맛볼 수 있는 중식당'
      )
    ).toBeInTheDocument();
  });
});
