/**
 * @jest-environment jsdom
 */

import { mockData } from '../src/index';

describe('컴포넌트 단위로 UI 테스트', () => {
  test('Restaurants 컴포넌트 에서 음식점 목록이 렌더링된다', () => {
    console.log(mockData);
  });
});
