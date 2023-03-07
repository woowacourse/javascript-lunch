/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';
import RestaurantListItem from '../src/components/main/restaurant/RestaurantListItem';
import RestaurantList from '../src/components/main/restaurant/RestaurantList';
import RestaurantFilterContainer from '../src/components/main/restaurant/RestaurantFilterContainer';
import Header from '../src/components/main/Header';
import Modal from '../src/components/main/Modal';

describe('컴포넌트 랜더링 테스트', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('RestaurantListItem 랜더링 테스트', () => {
    test('개별 요소 렌더링 테스트', () => {
      const restaurant = {
        category: '한식',
        name: '농민백암순대',
        distance: 15,
        description: '선릉에서 제일 유명한 국밥집',
        link: '',
      };

      new RestaurantListItem(document.body, { restaurant }).render();

      expect(screen.getByText('농민백암순대')).toBeInTheDocument();
      expect(screen.getByText('선릉에서 제일 유명한 국밥집')).toBeInTheDocument();
      expect(screen.getByText('캠퍼스부터 15분 내')).toBeInTheDocument();
    });
  });

  describe('RestaurantList 랜더링 테스트', () => {
    test('필터링 테스트', () => {
      const currentCategory = '양식';
      const currentSortBy = 'name';
      const restaurants = [
        {
          category: '한식',
          name: '농민백암순대',
          distance: 15,
          description: '선릉에서 제일 유명한 국밥집',
          link: '',
        },
        {
          category: '양식',
          name: '버거킹',
          distance: 10,
          description: '햄버거 하면 버거킹',
          link: '',
        },
      ];

      new RestaurantList(document.body, { currentCategory, currentSortBy, restaurants }).render();

      expect(screen.getByText('버거킹')).toBeInTheDocument();
      expect(screen.getByText('햄버거 하면 버거킹')).toBeInTheDocument();
      expect(screen.getByText('캠퍼스부터 10분 내')).toBeInTheDocument();
      expect(document.querySelectorAll('.restaurant').length).toBe(1);
    });
  });

  describe('RestaurantListHeader 테스트', () => {
    test('상태에 따른 selected 속성 테스트', () => {
      const currentCategory = '한식';
      const currentSortBy = 'distance';

      new RestaurantFilterContainer(document.body, { currentCategory, currentSortBy }).render();

      expect(document.querySelector(`option[value="${currentCategory}"]`)).toHaveAttribute(
        'selected'
      );
      expect(document.querySelector(`option[value="${currentSortBy}"]`)).toHaveAttribute(
        'selected'
      );
    });
  });

  describe('Header 테스트', () => {
    test('개별 요소 랜더링 테스트', () => {
      new Header(document.body, { toggleModal: () => {} }).render();

      expect(screen.getByText('점심 뭐 먹지')).toBeInTheDocument();
    });
  });

  describe('Modal 테스트', () => {
    test('개별 요소 렌더링 테스트: 카테고리', () => {
      new Modal(document.body, { toggleModal: () => {} }).render();

      const categoryElement = document.getElementById('category');
      const categories = ['한식', '중식', '일식', '양식', '아시안', '기타'];
      categories.forEach((category) => {
        expect(categoryElement).toContainHTML(`<option value="${category}">${category}</option>`);
      });
    });

    test('개별 요소 렌더링 테스트: 거리', () => {
      new Modal(document.body, { toggleModal: () => {} }).render();

      const distanceElement = document.getElementById('distance');
      const distances = [5, 10, 15, 20, 30];
      distances.forEach((distance) => {
        expect(distanceElement).toContainHTML(
          `<option value="${distance}">${distance}분 내</option>`
        );
      });
    });
  });
});
