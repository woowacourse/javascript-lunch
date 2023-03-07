import RestaurantList, { Restaurant } from '../src/domain/model/RestaurantList';

describe('음식점 목록에 대한 테스트', () => {
  const chinese: Restaurant = {
    name: '중화반점',
    category: '중식',
    distance: 5,
    description: '중화반점은 50년 전통의 수타면을 자랑합니다',
    link: 'www.naver.com',
  };

  const korean: Restaurant = {
    name: '시골밥상',
    category: '한식',
    distance: 30,
    description: '시골밥상은 정을 담았습니다.',
    link: 'www.yahoo.com',
  };

  const japanese: Restaurant = {
    name: '스시천국',
    category: '일식',
    distance: 20,
  };

  test('음식점을 목록에 추가하는 테스트', () => {
    //given
    const restaurantList = new RestaurantList();

    //when
    restaurantList.add(chinese);
    restaurantList.add(korean);
    restaurantList.add(japanese);
    const result = restaurantList.getList('전체', 'name');

    //then

    expect(result.length).toBe(3);
  });

  test('선택한 카테고리별로 음식점이 불러와지는지 테스트', () => {
    //given
    const restaurantList = new RestaurantList();

    //when
    restaurantList.add(chinese);
    restaurantList.add(korean);
    restaurantList.add(japanese);
    const chineseResult = restaurantList.getList('중식', 'name');
    const japaneseResult = restaurantList.getList('일식', 'name');
    const koreanResult = restaurantList.getList('한식', 'name');
    //then

    expect(chineseResult).toEqual([chinese]);
    expect(japaneseResult).toEqual([japanese]);
    expect(koreanResult).toEqual([korean]);
  });

  test('이름순으로 음식점이 불러와지는지 테스트', () => {
    //given
    const restaurantList = new RestaurantList();

    //when
    restaurantList.add(chinese);
    restaurantList.add(korean);
    restaurantList.add(japanese);
    const result = restaurantList.getList('전체', 'name');

    //then

    expect(result).toEqual([japanese, korean, chinese]);
  });

  test('거리순으로 음식점이 불러와지는지 테스트', () => {
    //given
    const restaurantList = new RestaurantList();

    //when
    restaurantList.add(chinese);
    restaurantList.add(korean);
    restaurantList.add(japanese);
    const result = restaurantList.getList('전체', 'distance');

    //then

    expect(result).toEqual([chinese, japanese, korean]);
  });
});
