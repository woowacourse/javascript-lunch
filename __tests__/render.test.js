/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';
import Header from '../src/components/Header';
import RestaurantFilterBar from '../src/components/RestaurantFilterBar';
import {
  CATEGORY,
  FILTER_CATEGORY,
  MINUTES_TO_CAMPUS,
  SORT_CONDITION,
} from '../src/data/Constants';
import RestaurantAddModal from '../src//components/RestaurantAddModal';

beforeEach(() => {
  document.body.innerHTML = '';
});

test('Header 렌더링 확인', () => {
  const header = new Header(document.body);
  header.render();

  expect(screen.queryByText('점심 뭐 먹지')).toBeInTheDocument();
  expect(screen.queryByLabelText('음식점 추가')).toBeInTheDocument();
});

test('RestaurantFilterBar 렌더링 확인', () => {
  const restaurantFilterBar = new RestaurantFilterBar(document.body);
  restaurantFilterBar.render();

  const $categoryFilter = document.getElementById('category-filter');
  const $sortingFilter = document.getElementById('sorting-filter');

  FILTER_CATEGORY.forEach((category) => {
    expect($categoryFilter).toContainHTML(`<option value="${category}">${category}</option>`);
  });

  SORT_CONDITION.forEach((condition) => {
    expect($sortingFilter).toContainHTML(`<option value="${condition}">${condition}순</option>`);
  });
});

test('RestaurantAddModal 렌더링 확인', () => {
  const restaurantAddModal = new RestaurantAddModal(document.body);
  restaurantAddModal.render();

  const $category = document.getElementById('category');
  const $distance = document.getElementById('distance');

  CATEGORY.forEach((category) => {
    expect($category).toContainHTML(`<option value="${category}">${category}</option>`);
  });

  MINUTES_TO_CAMPUS.forEach((distance) => {
    expect($distance).toContainHTML(`<option value="${distance}">${distance}분 내</option>`);
  });
});
