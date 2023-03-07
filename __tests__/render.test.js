/**
 * @jest-environment jsdom
 */

import { screen, fireEvent } from '@testing-library/dom';
import '@testing-library/jest-dom';

import Header from '../src/components/header.js';
import Select from '../src/components/select';
import RestaurantList from '../src/components/restaurantList.js';
import Modal from '../src/components/modal.js';
import NewRestaurantModalContent from '../src/components/newRestaurantModalContent.js';

import { $inBody } from '../src/utils/selector';
import { initialRestaurantList } from '../src/constants/initialRestaurantList';
import {
  FILTER_ID,
  FILTER_NAME,
  FILTER_CLASS,
  SELECT_OPTION_LIST,
} from '../src/constants/filter';

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

  test('header에는 "점심 뭐 먹지" text가 존재한다.', () => {
    // given
    const header = new Header({ title: '점심 뭐 먹지' });

    // when
    header.render();

    // then
    expect(screen.getByText('점심 뭐 먹지')).toBeInTheDocument();
  });

  test('category filter 요소 테스트', () => {
    // given
    const categoryFilter = new Select({
      id: FILTER_ID.CATEGORY,
      name: FILTER_NAME.CATEGORY,
      class: FILTER_CLASS,
      optionList: SELECT_OPTION_LIST.CATEGORY,
    });
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
    categoryFilter.render('.restaurant-filter-container');

    // then
    fireEvent.click($inBody('#category-filter'));
    categoryList.forEach(category =>
      expect(screen.getByText(category)).toBeInTheDocument()
    );
  });

  test('sorting filter 요소 테스트', () => {
    // given
    const sortingFilter = new Select({
      id: FILTER_ID.SORTING,
      name: FILTER_NAME.SORTING,
      class: FILTER_CLASS,
      optionList: SELECT_OPTION_LIST.SORTING,
    });
    const sortingList = ['이름순', '거리순'];

    // when
    sortingFilter.render('.restaurant-filter-container');

    // then
    fireEvent.click($inBody('#sorting-filter'));
    sortingList.forEach(sortBy =>
      expect(screen.getByText(sortBy)).toBeInTheDocument()
    );
  });

  test('restaurant List 테스트', () => {
    // given
    const restaurantList = new RestaurantList();
    const restaurantInfoList = initialRestaurantList;

    // when
    restaurantList.render(restaurantInfoList);

    // then
    restaurantInfoList.forEach(({ category, name, distance, description }) => {
      expect(screen.getByAltText(category)).toBeInTheDocument();
      expect(screen.getByText(name)).toBeInTheDocument();
      // expect(
      //   screen.getByText(`캠퍼스부터 ${distance}분 내`)
      // ).toBeInTheDocument();
      // expect(screen.getByText(description)).toBeInTheDocument();
    });
  });

  test('modal 요소 테스트', () => {
    // given
    const modal = new Modal();
    const newRestaurantModalContent = new NewRestaurantModalContent();
    const modalTextList = [
      '카테고리',
      '한식',
      '중식',
      '일식',
      '양식',
      '아시안',
      '기타',
      '이름',
      '거리(도보 이동 시간)',
      '5분 내',
      '10분 내',
      '15분 내',
      '20분 내',
      '30분 내',
      '설명',
      '메뉴 등 추가 정보를 입력해 주세요.',
      '참고 링크',
      '매장 정보를 확인할 수 있는 링크를 https:// 형식으로 입력해 주세요.',
      '취소하기',
      '추가하기',
    ];

    // when
    modal.render();
    newRestaurantModalContent.render('.modal-container');

    // then
    modalTextList.forEach(text =>
      expect(screen.getByText(text)).toBeInTheDocument()
    );
  });
});
