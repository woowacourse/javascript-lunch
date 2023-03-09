/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';
import RestaurantListItem from '../src/components/RestaurantListItem';
import RestaurantList from '../src/pages/RestaurantListPage/RestaurantList';
import RestaurantFilterContainer from '../src/pages/RestaurantListPage/RestaurantFilterContainer';
import GNB from '../src/components/GNB';
import AddRestaurantDrawer from '../src/pages/AddRestaurantDrawer';

describe('컴포넌트 랜더링 테스트', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('RestaurantListItem 랜더링 테스트', () => {
    test('RestaurantListItem 요소가 필요한 정보를 모두 갖추었는지 테스트', () => {
      const restaurant = {
        category: '한식',
        name: '농민백암순대',
        distance: 15,
        description: '선릉에서 제일 유명한 국밥집',
        link: '',
      };

      new RestaurantListItem({ $parent: document.body, restaurant }).render();
      expect(screen.getByText('농민백암순대')).toBeInTheDocument();
      expect(screen.getByText('선릉에서 제일 유명한 국밥집')).toBeInTheDocument();
      expect(screen.getByText('캠퍼스부터 15분 내')).toBeInTheDocument();
    });
  });

  describe('RestaurantList 랜더링 테스트', () => {
    test('음식 종류별 필터링한 결과가 잘 출력되는지 테스트', () => {
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
      const category = '양식';
      const sortBy = 'name';

      new RestaurantList({ $parent: document.body, restaurants, category, sortBy }).render();
      expect(screen.getByText('버거킹')).toBeInTheDocument();
      expect(screen.getByText('햄버거 하면 버거킹')).toBeInTheDocument();
      expect(screen.getByText('캠퍼스부터 10분 내')).toBeInTheDocument();
      expect(document.querySelectorAll('.restaurant').length).toBe(1);
    });
  });

  describe('RestaurantListHeader 테스트', () => {
    test('선택된 카테고리를 화면에 잘 나타내는지 테스트', () => {
      const category = '한식';
      const sortBy = 'distance';
      new RestaurantFilterContainer({ $parent: document.body, category, sortBy }).render();
      expect(document.querySelector(`option[value="${category}"]`)).toHaveAttribute('selected');
      expect(document.querySelector(`option[value="${sortBy}"]`)).toHaveAttribute('selected');
    });
  });

  describe('GNB 테스트', () => {
    test('GNB를 화면에 잘 나타내는지 테스트', () => {
      new GNB({ $parent: document.body, onToggleAddRestaurantDrawer: () => {} }).render();
      expect(screen.getByText('점심 뭐 먹지')).toBeInTheDocument();
    });
  });

  describe('AddRestaurantDrawer 테스트', () => {
    test('select 태그 렌더링 테스트: 카테고리', () => {
      new AddRestaurantDrawer({
        $parent: document.body,
        onToggleAddRestaurantDrawer: () => {},
      }).render();
      const categoryElement = document.getElementById('category');
      const categories = ['한식', '중식', '일식', '양식', '아시안', '기타'];
      categories.forEach((category) => {
        expect(categoryElement).toContainHTML(`<option value="${category}">${category}</option>`);
      });
    });

    test('select 태그 렌더링 테스트: 거리(도보 x분)', () => {
      new AddRestaurantDrawer({
        $parent: document.body,
        onToggleAddRestaurantDrawer: () => {},
      }).render();
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
