/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { screen, fireEvent } from '@testing-library/dom';

import Header from '../src/components/Header.js';
import RestaurantItem from '../src/components/RestaurantItem.js';
import AddModal from '../src/components/AddModal.js';

describe('UI 테스트', () => {
  test('header 렌더링 테스트', () => {
    document.body.innerHTML = '<header></header>';
    const header = new Header();
    document.querySelector('body').innerHTML = header.render();

    expect(screen.getByText('점심 뭐 먹지')).toBeInTheDocument();
  });

  test('RestaurantItem 렌더링 테스트', () => {
    const restaurantItem = new RestaurantItem({
      한식: '',
      중식: '',
      양식: '',
      일식: '',
      아시안: '',
      기타: '',
    });
    document.querySelector('body').innerHTML = restaurantItem.render({
      category: '양식',
      storeName: '크크루삥뽕',
      distance: 10,
      detail: '비밀임',
    });

    expect(screen.getByText('크크루삥뽕')).toBeInTheDocument();
  });

  test('addModal 렌더링 테스트', () => {
    document.body.innerHTML = `<div class="modal"></div>`;
    const addModal = new AddModal();
    document.querySelector('body').innerHTML = addModal.render();

    expect(screen.getByText('새로운 음식점')).toBeInTheDocument();
  });

  test('openAddDataModal 메서드 사용 테스트', () => {
    document.body.innerHTML = '<header></header><div class="modal"></div>';

    const header = new Header();
    const addModal = new AddModal();

    const newHeader = document.createElement('div');
    newHeader.className = 'check';
    const modal = document.createElement('div');
    modal.className = 'modalcheck';

    document.querySelector('header').appendChild(newHeader);
    document.querySelector('.modal').appendChild(modal);

    document.querySelector('.check').innerHTML = header.render();
    document.querySelector('.modalcheck').innerHTML = addModal.render();

    fireEvent.click(screen.getByLabelText('음식점 추가'));

    header.openAddDataModal();
    expect(screen.getByText('새로운 음식점')).toBeInTheDocument();
  });
});
