import Matzip from '../../src/matzip';
import { Restaurant, CategoryType } from '../../src/types';

describe('맛집 클래스 테스트', () => {
  it('카테고리가 빈 문자열이면 에러를 발생시킨다.', () => {
    // given
    const matzip = new Matzip([]);
    const matzip1: Restaurant = {
      name: '쑤쑤네짜장면',
      category: '' as CategoryType,
      distance: 5,
    };
    // when & then
    expect(() => matzip.add(matzip1)).to.throw();
  });
  it('존재하지않는 카테고리가 들어오면 에러를 발생시킨다.', () => {
    // given
    const matzip = new Matzip([]);
    const matzip1: Restaurant = {
      name: '쑤쑤네짜장면',
      category: '이탈리안' as CategoryType,
      distance: 5,
    };
    // when & then
    expect(() => matzip.add(matzip1)).to.throw();
  });
  it('음식점 이름이 비었으면 에러를 발생시킨다.', () => {
    // given
    const matzip = new Matzip([]);
    const matzip1: Restaurant = {
      name: '',
      category: '중식',
      distance: 5,
    };
    // when & then
    expect(() => matzip.add(matzip1)).to.throw();
  });
  it('거리값이 비었으면 에러를 발생시킨다.', () => {
    // given
    const matzip = new Matzip([]);
    const matzip1: Restaurant = {
      name: '쑤쑤네짜장면',
      category: '중식',
      distance: 0,
    };
    // when & then
    expect(() => matzip.add(matzip1)).to.throw();
  });
});
