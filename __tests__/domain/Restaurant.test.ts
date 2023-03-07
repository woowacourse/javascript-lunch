import Restaurant from '../../src/domain/Restaurant';

describe('Restaurant', () => {
  context('Restaurant는 카테고리, 이름, 거리, 설명, 참고 링크를 입력받았을 떄', () => {
    it('정상적으로 생성이 되어야 한다.', () => {
      // given
      const category = '한식';
      const name = '한식당';
      const distance = 5;
      const description = '맛있는 한식당입니다.';
      const referenceUrl = 'https://example.com/korean-restaurant';

      // when
      const restaurant = new Restaurant({
        category,
        name,
        distance,
        description,
        referenceUrl,
      });

      // then
      expect(restaurant).toBeInstanceOf(Restaurant);
    });
  });

  context('검삭하고자 하는 카테고리가 맞다면', () => {
    it('true를 반환한다.', () => {
      // given
      const serachCategory = '한식';
      const category = '한식';
      const name = '한식당';
      const distance = 5;
      const restaurant = new Restaurant({
        category,
        name,
        distance,
      });

      // when
      const isMatched = restaurant.isMatchCategory(serachCategory);

      expect(isMatched).toBeTruthy();
    });
  });
});
