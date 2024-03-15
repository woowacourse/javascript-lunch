import RestaurantCollection from '../../src/domains/entities/RestaurantCollection';
import { IRestaurant, IRestaurantInfo } from '../../src/types/Restaurant';

describe('레스토랑 리스트 클래스', () => {
  const restaurant1: IRestaurant = {
    name: '친친',
    distance: 30,
    category: '중식',
    description: '게살볶음밥 존맛',
    id: 1,
    isFavorite: false,
  };
  const restaurant2: IRestaurant = {
    name: '백소정',
    distance: 15,
    category: '일식',
    description: '치즈돈까스 존맛',
    id: 2,
    isFavorite: false,
  };
  const restaurant3: IRestaurant = {
    name: '라밥',
    distance: 20,
    category: '한식',
    description: '라면과 밥 맛있음',
    id: 3,
    isFavorite: false,
  };

  it('음식점들을 모두 반환한다.', () => {
    const RESTAURANTS: IRestaurant[] = [restaurant1, restaurant2];

    const restaurantList = new RestaurantCollection(RESTAURANTS);
    expect(restaurantList.get()).to.deep.equal([restaurant1, restaurant2]);
  });

  it('인자로 받은 카테고리 기준으로 필터링된 음식점을 반환한다.', () => {
    const RESTAURANTS: IRestaurant[] = [restaurant1, restaurant2];

    const restaurantList = new RestaurantCollection(RESTAURANTS);
    restaurantList.filterByCategory('중식');
    expect(restaurantList.get()).to.deep.equal([restaurant1]);
  });

  it('이름순 정렬을 요청받았을 때, 잘 정렬된 결과를 반환한다.', () => {
    const RESTAURANTS = [restaurant1, restaurant2, restaurant3];
    const EXPECTED_RESULT = [restaurant3, restaurant2, restaurant1];
    const RESTAURANTS_WITH_FAVORITE = RESTAURANTS.map((restaurant) => ({
      ...restaurant,
      isFavorite: false,
    }));
    const restaurantList = new RestaurantCollection(RESTAURANTS_WITH_FAVORITE);
    restaurantList.sortByName();
    expect(restaurantList.get()).to.deep.equal(EXPECTED_RESULT);
  });

  it('거리순 정렬을 요청받았을 때, 잘 정렬된 결과를 반환한다.', () => {
    const RESTAURANTS = [restaurant1, restaurant2, restaurant3];
    const EXPECTED_RESULT = [restaurant2, restaurant3, restaurant1];
    const RESTAURANTS_WITH_FAVORITE = RESTAURANTS.map((restaurant) => ({
      ...restaurant,
      isFavorite: false,
    }));
    const restaurantList = new RestaurantCollection(RESTAURANTS_WITH_FAVORITE);
    restaurantList.sortByDistance();
    expect(restaurantList.get()).to.deep.equal(EXPECTED_RESULT);
  });

  it('새로운 음식점을 정상적으로 잘 추가한다.', () => {
    const newRestaurant: IRestaurant = {
      name: '꺼벙이 김밥',
      distance: 5,
      category: '한식',
      description: '돈가스김밥 추천',
      isFavorite: false,
      id: 1,
    };
    const RESTAURANTS = [restaurant1, restaurant2, restaurant3];
    const RESTAURANTS_WITH_FAVORITE = RESTAURANTS.map((restaurant) => ({
      ...restaurant,
      isFavorite: false,
    }));

    const restaurantList = new RestaurantCollection(RESTAURANTS_WITH_FAVORITE);

    restaurantList.addRestaurant(newRestaurant);

    expect(restaurantList.get()).to.deep.equal([
      restaurant1,
      restaurant2,
      restaurant3,
      newRestaurant,
    ]);
  });

  it('중복된 음식점이 이미 있을 경우 에러를 반환한다.', () => {
    const newRstaurant: IRestaurant = restaurant1;
    const RESTAURANTS = [restaurant1, restaurant2, restaurant3];

    const restaurantList = new RestaurantCollection(RESTAURANTS);

    expect(() => restaurantList.addRestaurant(newRstaurant)).to.throw();
  });
});
