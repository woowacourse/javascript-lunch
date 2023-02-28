import Category from '../../src/domain/Category';
import Restaurant from '../../src/domain/Restaurant';

describe('Restaurant', () => {
  context('Restaurant는 카테고리, 이름, 거리, 설명, 참고 링크를 입력받았을 떄', () => {
    it('정상적으로 생성이 되어야 한다.', () => {
      // given
      const category = new Category('한식', 'korean.png');
      const name = '한식당';
      const description = '맛있는 한식당입니다.';
      const referenceUrl = 'https://example.com/korean-restaurant';

      // when
      const restaurant = new Restaurant({ category, name, description, referenceUrl, restaurant });

      // then
      expect(restaurant).toBeInstanceOf(Restaurant);
    });
  });
});
