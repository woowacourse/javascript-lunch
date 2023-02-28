import Category from '../../src/domain/Category';

describe('Category', () => {
  context('카테고리의 이름과 이미지 경로를 주었을 떄', () => {
    it('정상적으로 생성되어야 한다.', () => {
      // given
      const name = '중식';
      const image = 'chiness.png';

      // when
      const category = new Category(name, image);

      // then
      expect(category).toBeInstanceOf(Category);
    });
  });
});
