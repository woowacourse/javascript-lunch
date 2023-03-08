/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';
import { ListItem } from '../src/view/ListItem';
import { List } from '../src/view/List';

beforeEach(() => {
  document.body.innerHTML = '';
});

test('화면에 ListItem을 렌더링한다.', () => {
  const listItem = ListItem({
    category: '일식',
    name: '돈카라',
    distance: 5,
    description: '설명',
    link: 'link',
  });

  document.body.insertAdjacentHTML('beforeend', listItem);

  expect(screen.getByText('돈카라')).toBeInTheDocument();
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
      name: '작은동경',
      distance: 10,
      description: '상세 설명',
      link: 'link',
    },
  ];
  const list = List(restaurantList);

  document.body.insertAdjacentHTML('beforeend', list);

  const isRendered = restaurantList.every((restaurant) => screen.getByText(restaurant.name));

  expect(isRendered).toBe(true);
});
