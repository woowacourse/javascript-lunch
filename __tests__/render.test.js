/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';
import restaurantListItem from '../src/component/restaurantListPage/restaurantListItem';
import restaurantList from '../src/component/restaurantListPage/restaurantList';

describe('컴포넌트 랜더링 테스트', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  test('restaurantListItem 테스트', () => {
    const restaurant = {
      category: '한식',
      name: '농민백암순대',
      takeMinute: 15,
      description: '선릉에서 제일 유명한 국밥집',
      link: '',
    };

    document.body.innerHTML = restaurantListItem({ restaurant });

    expect(screen.getByText('농민백암순대')).toBeInTheDocument();
    expect(screen.getByText('선릉에서 제일 유명한 국밥집')).toBeInTheDocument();
    expect(screen.getByText('캠퍼스부터 15분 내')).toBeInTheDocument();
  });

  test('restaurantList 랜더링 테스트', () => {
    const restaurants = [
      {
        category: '한식',
        name: '농민백암순대',
        takeMinute: 15,
        description: '선릉에서 제일 유명한 국밥집',
        link: '',
      },
      {
        category: '양식',
        name: '버거킹',
        takeMinute: 10,
        description: '햄버거 하면 버거킹',
        link: '',
      },
    ];

    document.body.innerHTML = restaurantList({ restaurants });

    expect(screen.getByText('버거킹')).toBeInTheDocument();
    expect(screen.getByText('햄버거 하면 버거킹')).toBeInTheDocument();
    expect(screen.getByText('캠퍼스부터 10분 내')).toBeInTheDocument();

    expect(screen.getByText('버거킹')).toBeInTheDocument();
    expect(screen.getByText('햄버거 하면 버거킹')).toBeInTheDocument();
    expect(screen.getByText('캠퍼스부터 10분 내')).toBeInTheDocument();
  });
});
