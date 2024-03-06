import RestaurantService from '../../src/domain/RestaurantService';

describe('레스토랑 추가 기능 테스트', () => {
  const DUMMY = [
    { category: '한식', name: '꺼벙이분식', distance: 5, description: '돈까스 김밥 맛집', link: 'www.naver.com' },
    { category: '중식', name: '친친', distance: 5, description: '게살볶음밥 굿', link: 'www.daum.net' },
  ];

  it('모든 속성을 입력한 경우 레스토랑을 추가할 수 있다.', () => {
    const newRestaurant = {
      category: '기타',
      name: '오한수 우육면가',
      distance: 10,
      description: '우육면 + 군만두',
      link: 'www.naver.com',
    };

    const result = RestaurantService.addRestaurant(newRestaurant, DUMMY);

    expect(result).to.equal(true);
  });

  it('옵션 값들을 입력하지 않아도 레스토랑을 추가할 수 있다.', () => {
    const newRestaurant = {
      category: '기타',
      name: '오한수 우육면가',
      distance: 10,
      description: undefined,
      link: undefined,
    };

    const result = RestaurantService.addRestaurant(newRestaurant, DUMMY);

    expect(result).to.equal(true);
  });

  it('카테고리와 이름이 중복된 레스토랑을 추가할 수 없다.', () => {
    const newRestaurant = {
      category: '한식',
      name: '꺼벙이분식',
      distance: 10,
      description: '우육면 + 군만두',
      link: 'www.naver.com',
    };

    const result = RestaurantService.addRestaurant(newRestaurant, DUMMY);

    expect(result).to.equal(false);
  });
});
