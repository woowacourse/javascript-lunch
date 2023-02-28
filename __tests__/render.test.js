/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';
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
