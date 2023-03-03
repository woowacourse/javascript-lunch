import Restaurant, { RestaurantInfo } from '../src/domain/model/Restaurant';
import RestaurantList from '../src/domain/model/RestaurantList';

describe('음식점 목록에 대한 테스트', () => {
  const chinese: RestaurantInfo = {
    name: '중화반점',
    category: '중식',
    distance: 5,
    description: '중화반점은 50년 전통의 수타면을 자랑합니다',
    link: 'www.naver.com',
  };

  const korean: RestaurantInfo = {
    name: '시골밥상',
    category: '한식',
    distance: 30,
    description: '시골밥상은 정을 담았습니다.',
    link: 'www.yahoo.com',
  };

  const japanese: RestaurantInfo = {
    name: '스시천국',
    category: '일식',
    distance: 20,
  };

  const chineseRestaurant = new Restaurant(chinese);
  const koreanRestaurant = new Restaurant(korean);
  const japaneseRestaurant = new Restaurant(japanese);

  test('음식점을 목록에 추가하는 테스트', () => {
    //given
    const restaurantList = new RestaurantList();

    //when
    restaurantList.add(chineseRestaurant);
    restaurantList.add(koreanRestaurant);
    restaurantList.add(japaneseRestaurant);
    const result = restaurantList.getList('전체', 'name');

    //then

    expect(result.length).toBe(3);
  });

  test('선택한 카테고리별로 음식점이 불러와지는지 테스트', () => {
    //given
    const restaurantList = new RestaurantList();

    //when
    restaurantList.add(chineseRestaurant);
    restaurantList.add(koreanRestaurant);
    restaurantList.add(japaneseRestaurant);
    const chineseResult = restaurantList.getList('중식', 'name');
    const japaneseResult = restaurantList.getList('일식', 'name');
    const koreanResult = restaurantList.getList('한식', 'name');
    console.log(chineseResult, chineseRestaurant);
    //then

    expect(chineseResult).toEqual([chineseRestaurant]);
    expect(japaneseResult).toEqual([japaneseRestaurant]);
    expect(koreanResult).toEqual([koreanRestaurant]);
  });

  test('이름순으로 음식점이 불러와지는지 테스트', () => {
    //given
    const restaurantList = new RestaurantList();

    //when
    restaurantList.add(chineseRestaurant);
    restaurantList.add(koreanRestaurant);
    restaurantList.add(japaneseRestaurant);
    const result = restaurantList.getList('전체', 'name');

    //then

    expect(result).toEqual([
      japaneseRestaurant,
      koreanRestaurant,
      chineseRestaurant,
    ]);
  });

  test('거리순으로 음식점이 불러와지는지 테스트', () => {
    //given
    const restaurantList = new RestaurantList();

    //when
    restaurantList.add(chineseRestaurant);
    restaurantList.add(koreanRestaurant);
    restaurantList.add(japaneseRestaurant);
    const result = restaurantList.getList('전체', 'distance');

    //then

    expect(result).toEqual([
      chineseRestaurant,
      japaneseRestaurant,
      koreanRestaurant,
    ]);
  });
});
