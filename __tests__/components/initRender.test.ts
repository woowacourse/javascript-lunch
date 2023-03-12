/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import '../../src/components/index';
import render from '../../src/render/index';
import { screen } from '@testing-library/dom';

describe('초기 화면 렌더링 테스트', () => {
  // given
  document.body.innerHTML = `<div id="lunch-app"></div>`;
  render.init();

  context('초기 화면이 렌더링 되었을 때', () => {
    it('header가 렌더링되어야 한다.', () => {
      // when
      const headerTitle = screen.getByRole('heading', { level: 1 });
      const modalOpenButton = screen.getByAltText('음식점 추가');

      // then
      expect(headerTitle).toBeInTheDocument();
      expect(modalOpenButton).toBeInTheDocument();
    });

    it('음식점 타입 섹션 버튼이 렌더링되어야 한다.', () => {
      // when
      const allType = screen.getByText('모든 음식점');
      const favoriteType = screen.getByText('자주 가는 음식점');

      // then
      expect(allType).toBeInTheDocument();
      expect(favoriteType).toBeInTheDocument();
    });
  });
});
