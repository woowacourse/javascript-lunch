import Restaurant from '../../src/domain/Restaurant';

describe('Restaurant 도메인 테스트', () => {
  it('해당 음식점의 카테고리가 선택된 카테고리와 일치하는 지 확인한다.', () => {
    const restaurant = new Restaurant({ id: '0', category: '아시안', name: 'son', distance: 5, isFavorite: false });

    expect(restaurant.isMatchedCategory('아시안')).to.be.true;
    expect(restaurant.isMatchedCategory('중식')).to.be.false;
  });
});
