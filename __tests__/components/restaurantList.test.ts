/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import '../../src/components/index';
import render from '../../src/render/index';
import { screen } from '@testing-library/dom';
import { DEFAULT_RESTAURANTS } from '../../src/fixtures';

describe('음식점 목록 렌더링 테스트', () => {
  // given
  document.body.innerHTML = `<div id="lunch-app"></div>`;
  render.init();

  render.restaurantList(DEFAULT_RESTAURANTS);

  context('음식점 목록이 렌더링 될 때', () => {
    it('r-restaurant 가 생성된다.', () => {
      // when
      const fristRestaurant = screen.getByTestId('피양콩할머니');

      // then
      expect(fristRestaurant).toBeInTheDocument();
    });

    it('초기 음식점 목록은 6개이다.', () => {
      // when
      const restaurants = screen.getAllByRole('listitem');

      expect(restaurants.length).toBe(6);
    });
  });
});
