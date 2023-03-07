/**
 * @jest-environment jsdom
 */

import { screen, fireEvent, getByAltText } from '@testing-library/dom';
import '@testing-library/jest-dom';
import Header from '../src/components/header.js';

describe('렌더링 테스트', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  test('header 렌더링 테스트', () => {
    // given
    const $container = document.createElement('div');
    const headerTitle = '점심 뭐 먹지';
    const headerComponent = new Header();

    // when
    $container.insertAdjacentHTML('beforeend', headerComponent.template());

    // then
    expect(getByAltText($container, headerTitle)).not.toBeNull();
  });
});
