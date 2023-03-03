/**
 * @jest-environment jsdom
 */

import { screen, fireEvent } from '@testing-library/dom';
import '@testing-library/jest-dom';
import App from '../src/App';

function Appdiv() {
  const div = document.createElement('div');
  const app = new App(div);

  return app;
}

describe('dom 테스트를 시작합니다.', () => {
  test.skip('버튼 클릭시에 modal창이 띄워진다.', () => {
    const container = Appdiv();

    const button = screen.getByLabelText(container, '음식점 추가');

    fireEvent.click(button);

    const addButton = screen.findByText('추가하기');

    expect(addButton).toBeInTheDocument();
  });
});
