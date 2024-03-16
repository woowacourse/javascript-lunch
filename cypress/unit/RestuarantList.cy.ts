import Restaurant from '@/domains/entities/Restaurant';
import RestaurantCollection from '../../src/domains/entities/RestaurantCollection';
import { IRestaurant } from '../../src/types/Restaurant';

describe('레스토랑 리스트 클래스', () => {
  const restaurant1: IRestaurant = {
    name: '친친',
    distance: 30,
    category: '중식',
    description: '게살볶음밥 존맛',
  };
  const restaurant2: IRestaurant = {
    name: '백소정',
    distance: 15,
    category: '일식',
    description: '치즈돈까스 존맛',
  };
  const restaurant3: IRestaurant = {
    name: '라밥',
    distance: 20,
    category: '한식',
    description: '라면과 밥 맛있음',
  };

  it('인자로 음식점 배열을 받아서, 반환한다.', () => {
    const RESTAURANTS: IRestaurant[] = [restaurant1, restaurant2];
    const restaurantList = new RestaurantCollection(RESTAURANTS);
    expect(restaurantList.get()).to.deep.equal([restaurant1, restaurant2]);
  });

  it('카테고리 필터링기준을 인자로 받았을 때, 기준대로 필터링한 음식점을 반환한다.', () => {
    const RESTAURANTS: IRestaurant[] = [restaurant1, restaurant2];
    const restaurantList = new RestaurantCollection(RESTAURANTS);
    expect(restaurantList.filterByCategory('중식')).to.deep.equal([restaurant1]);
  });

  it('이름순 정렬을 요청받았을 때, 정렬된 결과를 반환한다.', () => {
    const RESTAURANTS = [restaurant1, restaurant2, restaurant3];
    const EXPECTED_RESULT = [restaurant3, restaurant2, restaurant1];
    const restaurantList = new RestaurantCollection(RESTAURANTS);
    expect(restaurantList.sortByName()).to.deep.equal(EXPECTED_RESULT);
  });

  it('거리순 정렬을 요청받았을 때, 정렬된 결과를 반환한다.', () => {
    const RESTAURANTS = [restaurant1, restaurant2, restaurant3];
    const EXPECTED_RESULT = [restaurant2, restaurant3, restaurant1];
    const restaurantList = new RestaurantCollection(RESTAURANTS);
    expect(restaurantList.sortByDistance()).to.deep.equal(EXPECTED_RESULT);
  });

  it('새로운 음식점을 정상적으로 추가한다.', () => {
    const newRestaurant: IRestaurant = {
      name: '꺼벙이 김밥',
      distance: 5,
      category: '한식',
      description: '돈가스김밥 추천',
    };
    const RESTAURANTS = [restaurant1, restaurant2, restaurant3];
    const restaurantList = new RestaurantCollection(RESTAURANTS);

    restaurantList.addRestaurant(newRestaurant);

    expect(restaurantList.get()).to.deep.equal([
      restaurant1,
      restaurant2,
      restaurant3,
      newRestaurant,
    ]);
  });

  it('중복된 음식점이 이미 있을 경우 에러를 반환한다.', () => {
    const newRstaurant: IRestaurant = { ...restaurant1 };
    const RESTAURANTS = [restaurant1, restaurant2, restaurant3];
    const restaurantList = new RestaurantCollection(RESTAURANTS);

    expect(() => restaurantList.addRestaurant(newRstaurant)).to.throw('[ERROR]');
  });
});
