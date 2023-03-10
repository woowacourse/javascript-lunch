/**
 * @jest-environment jsdom
 */

import { screen, fireEvent } from '@testing-library/dom';
import '@testing-library/jest-dom';
import App from '../src/App';

function render() {
  document.body.innerHTML = `
    <div id="app"></div>
    <div class="modal" title="modal">
      <div class="modal-backdrop"></div>
      <div class="modal-container"></div>
    </div>
  `;

  const $app = document.getElementById('app');

  new App($app);
}

describe('dom 테스트를 시작합니다.', () => {
  beforeEach(render);

  test('버튼 클릭시에 modal창이 띄워진다.', () => {
    const button = screen.getByLabelText('음식점 추가');

    fireEvent.click(button);

    const addButton = screen.getByLabelText('submit-form');

    expect(addButton).toBeInTheDocument();
  });
});
