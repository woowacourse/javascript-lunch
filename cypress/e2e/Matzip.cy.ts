import Matzip from '../../src/matzip';
import { Restaurant, CategoryType } from '../../src/types';
import matzipList from '../../src/mock/restaurants';

describe('맛집 클래스 테스트', () => {
  describe('맛집 추가 테스트', () => {
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
    it('정해진 거리값이 아닐 때 에러를 발생시킨다.', () => {
      // given
      const matzip = new Matzip([]);
      const matzip1: Restaurant = {
        name: '쑤쑤네짜장면',
        category: '중식',
        distance: 6,
      };
      // when & then
      expect(() => matzip.add(matzip1)).to.throw();
    });
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
      expect(matzip.restaurants.length).to.eq(1);
    });
  });
  describe('맛집 정렬 테스트', () => {
    it('맛집 이름순 정렬 테스트', () => {
      // given
      const matzip = new Matzip(matzipList);
      const sortedByNameResult = ['썬데이네쌀국수', '쑤쑤당', '쿠키네칼국수', '파슬리네텐동'];
      // when
      const sortedMatzip = matzip.sort('name', matzipList);
      // then
      expect(sortedMatzip.map((matzip) => matzip.name)).to.have.ordered.members(sortedByNameResult);
    });

    it('맛집 거리순 정렬 테스트', () => {
      // given
      const matzip = new Matzip(matzipList);
      const sortedByDistanceResult = ['쿠키네칼국수', '썬데이네쌀국수', '쑤쑤당', '파슬리네텐동'];
      // when
      const sortedMatzip = matzip.sort('distance', matzipList);
      // then
      expect(sortedMatzip.map((matzip) => matzip.name)).to.have.ordered.members(
        sortedByDistanceResult,
      );
    });
  });
  describe('맛집 필터링 테스트', () => {
    it('필터로 기타를 고르면 식당이름은 쑤쑤당이다.', () => {
      // given
      const matzip = new Matzip(matzipList);
      const filterByCategoryResult = '쑤쑤당';
      // when
      const result = matzip.filterByCategory('기타');
      // then
      expect(result.map((restaurant) => restaurant.name)).to.include(filterByCategoryResult);
    });
  });
});
