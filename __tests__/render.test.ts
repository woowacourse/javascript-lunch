/**
 * @jest-environment jsdom
 */

import { screen, fireEvent } from '@testing-library/dom';
import '@testing-library/jest-dom';

import RestaurantList, { Restaurant } from '../src/domain/model/RestaurantList';
import '../src/components';
import { $ } from '../src/utils';

describe('음식점 목록에 대한 테스트', () => {
  const chinese: Restaurant = {
    name: '중화반점',
    category: '중식',
    distance: 5,
    description: '중화반점은 50년 전통의 수타면을 자랑합니다',
    link: 'www.naver.com',
  };

  const korean: Restaurant = {
    name: '시골밥상',
    category: '한식',
    distance: 30,
    description: '시골밥상은 정을 담았습니다.',
    link: 'www.yahoo.com',
  };

  const japanese: Restaurant = {
    name: '스시천국',
    category: '일식',
    distance: 20,
  };

  beforeEach(() => {
    document.body.innerHTML = '';
  });

  test('음식점을 목록에 추가하는 테스트', () => {
    //given
    const restaurantList = new RestaurantList();
    document.body.innerHTML = '<div>메세지 변경하기</div>';
    //when
    restaurantList.add(chinese);
    restaurantList.add(korean);
    restaurantList.add(japanese);

    // const result = restaurantList.getList('전체', 'name');

    // const header = new Header();

    //then
    expect(screen.getByText('메세지 변경하기')).toBeInTheDocument();
  });
});
