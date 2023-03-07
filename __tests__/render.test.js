/**
 * @jest-environment jsdom
 */

import { screen, fireEvent } from '@testing-library/dom';
import '@testing-library/jest-dom';
import Header from '../src/components/header.js';
import CategoryFilter from '../src/components/categoryFilter.js';
import SortingFilter from '../src/components/sortingFilter.js';
import { $inBody } from '../src/util/selector';

describe('렌더링 테스트', () => {
  beforeEach(() => {
    document.body.innerHTML = `
			<body>
				<header class="gnb">
				</header>

				<main>
					<!-- 카테고리/정렬 필터 -->
					<section class="restaurant-filter-container">
						<!-- 정렬 셀렉트 박스 -->
					</section>
		
					<!-- 음식점 목록 -->
					<section class="restaurant-list-container">
						<ul class="restaurant-list"></ul>
					</section>
		
					<!-- 음식점 추가 모달 -->
					<section class="restaurant-add-modal">
					</section>
				</main>
			</body>
		
		</html>
		`;
  });

  const $container = document.querySelector('body');

  test('header에는 "점심 뭐 먹지" text가 존재한다.', () => {
    // given
    const headerTitle = '점심 뭐 먹지';
    const headerComponent = new Header();

    // when
    headerComponent.render();

    // then
    expect(screen.getByText(headerTitle)).toBeInTheDocument();
  });

  test('category filter 요소 테스트', () => {
    // given
    const categoryFilter = new CategoryFilter();
    const categoryList = [
      '전체',
      '한식',
      '중식',
      '일식',
      '양식',
      '아시안',
      '기타',
    ];

    // when
    categoryFilter.render();

    // then
    fireEvent.click($inBody('#category-filter'));
    categoryList.forEach(category =>
      expect(screen.getByText(category)).toBeInTheDocument()
    );
  });

  test('sorting filter 요소 테스트', () => {
    // given
    const sortingFilter = new SortingFilter();
    const sortingList = ['이름순', '거리순'];

    // when
    sortingFilter.render();

    // then
    fireEvent.click($inBody('#sorting-filter'));
    sortingList.forEach(sortBy =>
      expect(screen.getByText(sortBy)).toBeInTheDocument()
    );
  });
});
