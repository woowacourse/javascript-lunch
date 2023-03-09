/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';
import { qs } from '../src/utils/domHelpers.js';

import Header from '../src/components/Header.js';
import RestaurantItem from '../src/components/RestaurantItem.js';
import AddModal from '../src/components/AddModal.js';

describe('UI 테스트', () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <header class="gnb"></header>

    <section class="restaurant-filter-container">
      <select name="category" id="category-filter" class="restaurant-filter">
        <option value="전체">전체</option>
        <option value="한식">한식</option>
        <option value="중식">중식</option>
        <option value="일식">일식</option>
        <option value="양식">양식</option>
        <option value="아시안">아시안</option>
        <option value="기타">기타</option>
      </select>

      <select name="sorting" id="sorting-filter" class="restaurant-filter">
        <option value="name">이름순</option>
        <option value="distance">거리순</option>
      </select>
    </section>

    <section class="restaurant-list-container">
      <ul class="restaurant-list"></ul>
    </section>

    <div class="modal"></div>`;
  });

  test('header 렌더링 테스트', () => {
    const header = new Header(qs('.gnb'));

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
    document.querySelector('.restaurant-list').innerHTML = restaurantItem.render({
      category: '양식',
      storeName: '크크루삥뽕',
      distance: 10,
      detail: '비밀임',
    });

    expect(screen.getByText('크크루삥뽕')).toBeInTheDocument();
  });

  test('addModal 렌더링 테스트', () => {
    const addModal = new AddModal(qs('.modal'));

    expect(screen.getByText('새로운 음식점')).toBeInTheDocument();
  });
});
