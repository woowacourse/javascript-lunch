/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { screen } from 'shadow-dom-testing-library';
import App from '../src/domain/App';
import RestaurantList, { Restaurant } from '../src/domain/RestaurantList';
import '../src/components';
import { $, shortenString } from '../src/utils';
import { fireEvent } from '@testing-library/dom';
import { LOCAL_STORAGE_KEY } from '../src/constants';

describe('렌더가 잘 되는 지 테스트', () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <div id="app">
    <div class="navigation-bar">
      <lunch-header></lunch-header>
      <section class="category-section">
        <restaurant-tab id="allTab" name="모든 음식점"></restaurant-tab>
        <restaurant-tab
          id="favoriteTab"
          name="자주 가는 음식점"
        ></restaurant-tab>
      </section>
      <section class="restaurant-filter-container">
        <filter-box
          name="category"
          id="categoryFilter"
          options="전체,한식,중식,일식,양식,아시안,기타"
        ></filter-box>
        <filter-box name="sorting" id="sortingFilter" options="이름순,거리순">
        </filter-box>
      </section>
    </div>
    <restaurant-boxes></restaurant-boxes>
    <add-restaurant-modal id="addRestaurantModal"></add-restaurant-modal>
    <restaurant-detail-modal id="openDetail"></restaurant-detail-modal>
    <delete-question-modal id="deleteQuestionModal"></delete-question-modal>
  </div>
`;
    const defaultValue = JSON.stringify('');
    window.localStorage.setItem(LOCAL_STORAGE_KEY, defaultValue);
  });

  const chinese: Restaurant = {
    name: '중화반점',
    category: '중식',
    distance: 5,
    description: '중화반점은 50년 전통의 수타면을 자랑합니다',
    link: 'www.naver.com',
    isFavorite: false,
  };

  const korean: Restaurant = {
    name: '시골밥상',
    category: '한식',
    distance: 30,
    description: '시골밥상은 정을 담았습니다.',
    link: 'www.yahoo.com',
    isFavorite: false,
  };

  const japanese: Restaurant = {
    name: '스시천국',
    category: '일식',
    distance: 20,
    isFavorite: false,
  };

  const restaurants = [chinese, korean, japanese];

  test('헤더가 올바르게 나오는 지 테스트', () => {
    //given

    //when

    //then
    expect(screen.getByShadowText('점심 뭐 먹지')).toBeInTheDocument();
  });

  test('음식점 목록이 올바르게 나오는 지 테스트', () => {
    //given

    //when
    $('restaurant-boxes').restaurantListRender(restaurants);

    //then
    expect(screen.getByShadowText('중화반점')).toBeInTheDocument();
    expect(screen.getByShadowText('시골밥상')).toBeInTheDocument();
    expect(screen.getByShadowText('스시천국')).toBeInTheDocument();

    expect(screen.getByShadowText('캠퍼스부터 5분 내')).toBeInTheDocument();
    expect(screen.getByShadowText('캠퍼스부터 30분 내')).toBeInTheDocument();
    expect(screen.getByShadowText('캠퍼스부터 20분 내')).toBeInTheDocument();
  });

  test('모달 창이 올바르게 열리는 지 테스트', () => {
    //given

    //when
    expect(
      $('add-restaurant-modal')?.shadowRoot?.querySelector('#modal')
    ).not.toHaveClass('modal-open');

    fireEvent.click(screen.getByShadowAltText('음식점 추가'));

    //then
    expect(
      $('add-restaurant-modal')?.shadowRoot?.querySelector('#modal')
    ).toHaveClass('modal-open');
  });

  test('모달 창이 올바르게 닫히는 지 테스트', () => {
    //given

    //when
    fireEvent.click(screen.getByShadowAltText('음식점 추가'));

    expect(
      $('add-restaurant-modal')?.shadowRoot?.querySelector('#modal')
    ).toHaveClass('modal-open');

    fireEvent.click(screen.getByShadowText('취소하기'));

    //then
    expect(
      $('add-restaurant-modal')?.shadowRoot?.querySelector('#modal')
    ).not.toHaveClass('modal-open');
  });

  test('음식점 목록 추가가 올바르게 되는 지 테스트', () => {
    //given
    const CATEGORY = '중식';
    const NAME = '춘리짜장';
    const DISTANCE = '10';
    const DESCRIPTION =
      '10년의 인고의 세월을 노력하여 중국집을 개업했습니다. 잘 부탁드립니다';
    const LINK = 'www.never.com/';

    //when
    $('#favoriteTab').notSelect();

    screen.getByShadowAltText('음식점 추가');

    $('add-restaurant-modal')
      .shadowRoot.querySelector('add-restaurant-form')
      .shadowRoot.querySelector('#category')
      .shadowRoot.querySelector('#category').value = CATEGORY;

    $('add-restaurant-modal')
      .shadowRoot.querySelector('add-restaurant-form')
      .shadowRoot.querySelector('#name')
      .shadowRoot.querySelector('#name').value = NAME;

    $('add-restaurant-modal')
      .shadowRoot.querySelector('add-restaurant-form')
      .shadowRoot.querySelector('#distance')
      .shadowRoot.querySelector('#distance').value = DISTANCE;

    $('add-restaurant-modal')
      .shadowRoot.querySelector('add-restaurant-form')
      .shadowRoot.querySelector('#description')
      .shadowRoot.querySelector('#description').value = DESCRIPTION;

    $('add-restaurant-modal')
      .shadowRoot.querySelector('add-restaurant-form')
      .shadowRoot.querySelector('#link')
      .shadowRoot.querySelector('#link').value = LINK;

    const category = $('add-restaurant-modal')
      .shadowRoot.querySelector('add-restaurant-form')
      .shadowRoot.querySelector('#category')
      .getSelectValue();

    const name = $('add-restaurant-modal')
      .shadowRoot.querySelector('add-restaurant-form')
      .shadowRoot.querySelector('#name')
      .getTextValue();

    const distance = $('add-restaurant-modal')
      .shadowRoot.querySelector('add-restaurant-form')
      .shadowRoot.querySelector('#distance')
      .getSelectValue();

    const description = $('add-restaurant-modal')
      .shadowRoot.querySelector('add-restaurant-form')
      .shadowRoot.querySelector('#description')
      .getTextValue();

    const link = $('add-restaurant-modal')
      .shadowRoot.querySelector('add-restaurant-form')
      .shadowRoot.querySelector('#link')
      .getTextValue();

    fireEvent.click(screen.getByShadowText('추가하기'));

    //then
    expect(category).toBe(CATEGORY);
    expect(name).toBe(NAME);
    expect(distance).toBe(DISTANCE);
    expect(description).toBe(DESCRIPTION);
    expect(link).toBe(LINK);

    expect(screen.getByShadowText(NAME)).toBeInTheDocument();
    expect(
      screen.getByShadowText(`캠퍼스부터 ${DISTANCE}분 내`)
    ).toBeInTheDocument();
    expect(
      screen.getByShadowText(shortenString(DESCRIPTION, 30))
    ).toBeInTheDocument();
  });
  test('음식점 목록 상세 정보가 렌더되는 지 테스트', () => {
    //given
    RestaurantList.add(korean);
    new App().play();

    //when
    fireEvent.click(screen.getByShadowText(korean.name));

    //then
    expect(screen.getByShadowText(korean.link)).toBeInTheDocument();
    expect(screen.getByShadowText('삭제하기')).toBeInTheDocument();
    expect(screen.getByShadowText('닫기')).toBeInTheDocument();
  });
  test('음식점 목록 삭제가 올바르게 작동하는 지 테스트', () => {
    //given
    RestaurantList.add(korean);
    new App().play();

    //when
    fireEvent.click(screen.getByShadowText(korean.name));
    fireEvent.click(screen.getByShadowText('삭제하기'));
    fireEvent.click(screen.getByShadowText('예'));

    //then
    expect(
      screen.getByShadowText('음식점 목록이 비었습니다')
    ).toBeInTheDocument();
  });
  test('자주가는 음식점 탭 이동 시 올바르게 렌더 되는 지 테스트', () => {
    //given
    RestaurantList.add(korean);
    new App().play();

    //when
    fireEvent.click(screen.getByShadowText('자주 가는 음식점'));

    //then
    expect(
      screen.getByShadowText('음식점 목록이 비었습니다')
    ).toBeInTheDocument();

    fireEvent.click(screen.getByShadowText('모든 음식점'));

    expect(screen.getByShadowText(korean.name)).toBeInTheDocument();
  });

  test('자주가는 음식점 탭 이동과 즐겨찾기 후 올바르게 렌더 되는 지 테스트', () => {
    //given
    RestaurantList.add(korean);
    new App().play();

    //when
    fireEvent.click(screen.getByShadowText('자주 가는 음식점'));

    //then
    expect(
      screen.getByShadowText('음식점 목록이 비었습니다')
    ).toBeInTheDocument();

    //when
    fireEvent.click(screen.getByShadowText('모든 음식점'));
    fireEvent.click(screen.getByShadowAltText('isFavorite'));

    //then
    expect(screen.getByShadowText(korean.name)).toBeInTheDocument();

    //when
    fireEvent.click(screen.getByShadowText('자주 가는 음식점'));

    //then
    expect(screen.getByShadowText(korean.name)).toBeInTheDocument();
  });
});
