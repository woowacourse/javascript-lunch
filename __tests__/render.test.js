/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';

import { LunchRecommendation } from '../src/domain/model/LunchRecommendation';

import { mockData } from '../src/data/mockData';
import { getData } from '../src/utils/common/localStorage';
import { useBoolean } from '../src/utils/hooks/useBoolean';
import { $, $$ } from '../src/utils/common/domHelper';

import { Header } from '../src/view/components/Header';
import { Nav } from '../src/view/components/Nav';
import { RestaurantList } from '../src/view/components/RestaurantList';
import { AddFormModal } from '../src/view/components/AddFormModal';

const insertToDocument = (element) => {
  document.body.insertAdjacentHTML('beforeend', element);
};

const [isOpen, open, close] = useBoolean(false);

describe('컴포넌트 단위로 UI 테스트', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  test('RestaurantList 컴포넌트 에서 음식점 목록이 렌더링된다', () => {
    localStorage.setItem('mock', JSON.stringify(mockData));
    const lunchRecommendation = new LunchRecommendation(getData());
    const restaurants = lunchRecommendation.getList();

    const restaurantListSection = RestaurantList({ restaurants });
    insertToDocument(restaurantListSection);
    const restaurantLi = $$('.restaurant');

    expect(restaurantLi.length).toBe(mockData.length);
  });

  test('Header 렌더링 테스트', () => {
    insertToDocument(Header({ open }));

    expect(screen.getByText('점심 뭐 먹지')).toBeInTheDocument();
  });

  test('Nav 렌더링 테스트', () => {
    const koreanCategory = '한식';
    const distanceSortOption = '거리순';

    function handleCategory() {
      lunchRecommendation.renderBy({ koreanCategory, distanceSortOption });
    }

    localStorage.setItem('mock', JSON.stringify(mockData));
    const lunchRecommendation = new LunchRecommendation(getData());

    insertToDocument(Nav({ koreanCategory, distanceSortOption, handleCategory, handleCategory }));

    expect(screen.getByText(distanceSortOption)).toBeInTheDocument();
  });

  test('AddFormModal 렌더링 테스트', () => {
    insertToDocument(AddFormModal({ close }));

    expect(screen.getByText('추가하기')).toBeInTheDocument();
  });
});
