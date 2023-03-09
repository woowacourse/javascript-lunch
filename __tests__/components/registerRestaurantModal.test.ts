/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import '../../src/components/index';
import render from '../../src/render/index';
import { screen } from '@testing-library/dom';

describe('음식점 등록 모달 창 렌더링 테스트', () => {
  // given
  document.body.innerHTML = `<div id="lunch-app"></div>`;
  render.init();

  render.openRegisterRestaurantModal();

  context('음식점 모달 창이 렌더링이 될 때', () => {
    it('음식점을 생성할 수 있는 form 태그가 있다.', () => {
      // when
      const registerForm = screen.getByTestId('register-restaurant-form');

      // then
      expect(registerForm).toBeInTheDocument();
    });

    it('취소하기, 추가하기의 두가지 버튼이 있다.', () => {
      // when
      const canelButton = screen.getByTestId('cancel-button');
      const addButton = screen.getByTestId('add-button');

      // then
      expect(canelButton).toBeInTheDocument();
      expect(addButton).toBeInTheDocument();
    });
  });
});
