/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import '../../src/components/index';
import render from '../../src/render/index';
import { screen } from '@testing-library/dom';
import { DEFAULT_RESTAURANTS } from '../../src/fixtures';

describe('음식점 세부정보 모달 창 렌더링 테스트', () => {
  // given
  document.body.innerHTML = `<div id="lunch-app"></div>`;
  render.init();

  const restaurant = DEFAULT_RESTAURANTS[0];

  render.openRestaurantDetailModal(restaurant);

  context('음식점 모달 창이 렌더링이 될 때', () => {
    it('음식점을 세부정보를 보여준다.', () => {
      // when
      const restaurantDetail = screen.getByTestId('restaurant-detail');

      // then
      expect(restaurantDetail).toBeInTheDocument();
    });

    it('삭제하기, 닫기의 두가지 버튼이 있다.', () => {
      // when
      const deleteButton = screen.getByTestId('delete-button');
      const canelButton = screen.getByTestId('cancel-button');

      // then
      expect(canelButton).toBeInTheDocument();
      expect(deleteButton).toBeInTheDocument();
    });
  });
});
