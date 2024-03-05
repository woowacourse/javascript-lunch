import Matzip from '../src/matzip';
import { Restaurant } from '../src/types';

describe('맛집 클래스 테스트', () => {
  it('맛집 추가 테스트', () => {
    // given
    const matzip = new Matzip([]);
    const matzip1: Restaurant = {
      name: '쑤쑤네짜장면',
      category: '중식',
      distance: 5,
    };
    // when
    matzip.add(matzip1);
    // then
    expect(matzip.restaurants.length).toBe(1);
  });
});
