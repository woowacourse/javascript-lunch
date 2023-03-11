/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { screen } from 'shadow-dom-testing-library';
import { Restaurant } from '../src/domain/RestaurantList';
import '../src/components';
import { $ } from '../src/utils';
import { fireEvent } from '@testing-library/dom';

describe('렌더가 잘 되는 지 테스트', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
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
    document.body.innerHTML = '<lunch-header></lunch-header>';
    //when

    //then
    expect(screen.getByShadowText('점심 뭐 먹지')).toBeInTheDocument();
  });

  test('음식점 목록이 올바르게 나오는 지 테스트', () => {
    //given
    document.body.innerHTML = '<restaurant-boxes></restaurant-boxes>';
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
    document.body.innerHTML = `<lunch-header></lunch-header>
    <add-restaurant-modal />
    `;
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
    document.body.innerHTML = `<lunch-header></lunch-header>
    <add-restaurant-modal />
    `;
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
});
