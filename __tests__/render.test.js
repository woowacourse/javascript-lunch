/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';

import { List } from '../src/view/List';
import { ListItem } from '../src/view/ListItem';

test('화면에 ListItem을 렌더링한다.', () => {
  const listItem = ListItem({
    category: '일식',
    name: '지구당',
    distance: 5,
    description: '상세 설명',
    link: 'link',
  });

  document.body.insertAdjacentHTML('beforeend', listItem);

  expect(screen.getByText('지구당')).toBeInTheDocument();
});

test('화면에 List를 렌더링한다.', () => {
  const restaurantList = [
    {
      category: '일식',
      name: '돈카라',
      distance: 5,
      description: '상세 설명',
      link: 'link',
    },
    {
      category: '한식',
      name: '김돈이',
      distance: 5,
      description: '상세 설명',
      link: 'link',
    },
    {
      category: '일식',
      name: '지구당',
      distance: 5,
      description: '상세 설명',
      link: 'link',
    },
  ];
  const list = List(restaurantList);

  document.body.insertAdjacentHTML('beforeend', list);

  const isRendered = restaurantList.every((restaurant) => screen.getByText(restaurant.name));

  expect(isRendered).toBe(true);
});
