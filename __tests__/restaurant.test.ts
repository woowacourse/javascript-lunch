import Restaurant from '../src/domain/model/Restaurant';

describe('레스토랑 모델에 대한 테스트', () => {
  const chinese = {
    link: 'www.naver.com',
    name: '중화반점',
    category: '중식',
    distance: 5,
    description: '중화반점은 50년 전통의 수타면을 자랑합니다',
  };
  const restaurant = new Restaurant(chinese);

  test('음식점의 정보를 올바르게 가져오는 지 테스트', () => {
    //given

    //when

    //then
    const result = restaurant.getInfo();

    expect(result).toEqual(chinese);
  });
});
