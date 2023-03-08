/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';
import { ListItem } from '../src/view/ListItem';

test('화면에 ListItem을 렌더링한다.', () => {
  const listItem = ListItem({
    category: '한식',
    name: '김돈이',
    distance: 5,
    description: '설명',
    link: 'link',
  });

  document.body.insertAdjacentHTML('beforeend', listItem);

  expect(screen.getByText('김돈이')).toBeInTheDocument();
});
