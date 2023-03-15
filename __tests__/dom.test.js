/**
 * @jest-environment jsdom
 */

import { screen, fireEvent } from '@testing-library/dom';
import '@testing-library/jest-dom';
import App from '../src/App';

function render() {
  document.body.innerHTML = `
    <haeder class="gnb"></haeder>
    <main>
      <div class="tab-container"></div>
      <article id="list-article">
        <section class="restaurant-filter-container"></section>
        <section class="restaurant-list-container"></section>
      </article>
    </main>
    <div class="modal">
      <div class="modal-backdrop"></div>
      <div class="modal-container"></div>
    </div>
  `;

  new App();
}

describe('dom 테스트를 시작합니다.', () => {
  beforeEach(render);

  test('버튼 클릭시에 modal창이 띄워진다.', () => {
    console.log(document.body, '@@');

    const button = screen.getByLabelText('음식점 추가');

    fireEvent.click(button);

    const addButton = screen.getByText('추가하기');

    expect(addButton).toBeInTheDocument();
  });
});
