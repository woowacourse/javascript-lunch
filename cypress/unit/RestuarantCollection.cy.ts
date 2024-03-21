import Restaurant from '@/domains/entities/Restaurant';
import RestaurantCollection from '../../src/domains/entities/RestaurantCollection';
import { IRestaurant } from '../../src/types/Restaurant';
import NewRestaurantForm from '@/components/NewRestaurantModal/NewRestaurantForm';
import { rest } from 'cypress/types/lodash';

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

  it('음식점 추가를 요청받았을 때, 추가한 결과를 반환한다.', () => {
    const newRestaurant: IRestaurant = {
      name: '꺼벙이 김밥',
      distance: 5,
      category: '한식',
      description: '돈가스김밥 추천',
    };
    const RESTAURANTS = [restaurant1, restaurant2, restaurant3];
    const restaurantList = new RestaurantCollection(RESTAURANTS);

    expect(restaurantList.add(newRestaurant)).to.deep.equal([
      restaurant1,
      restaurant2,
      restaurant3,
      newRestaurant,
    ]);
  });

  it('중복된 음식점을 입력으로 받았을 때, 에러를 반환한다.', () => {
    const newRstaurant: IRestaurant = { ...restaurant1 };
    const RESTAURANTS = [restaurant1, restaurant2, restaurant3];
    const restaurantList = new RestaurantCollection(RESTAURANTS);

    expect(() => restaurantList.add(newRstaurant)).to.throw('[ERROR]');
  });

  it('입력으로 받은 음식점의 존재여부를 요청받았을 때, 존재 여부를 반환한다.', () => {
    const newRstaurant: IRestaurant = { ...restaurant1 };
    const RESTAURANTS = [restaurant1, restaurant2, restaurant3];
    const restaurantList = new RestaurantCollection(RESTAURANTS);

    expect(restaurantList.has(newRstaurant)).to.be.equal(true);
  });

  it('입력으로 받은 음식점의 삭제를 요청받았을 때, 존재한다면 해당 음식점을 삭제한후 반환한다', () => {
    const newRstaurant: IRestaurant = { ...restaurant1 };
    const RESTAURANTS = [restaurant1, restaurant2, restaurant3];
    const restaurantList = new RestaurantCollection(RESTAURANTS);

    expect(restaurantList.remove(newRstaurant).length).to.be.equal(2);
  });

  it('입력으로 받은 음식점의 업데이트를 요청받았을 때, 해당 음식점만 찾아 업데이트하고 반환한다.', () => {
    const RESTAURANTS = [restaurant1, restaurant2, restaurant3];
    const restaurantCollection = new RestaurantCollection(RESTAURANTS);
    const newRestaurant = { ...restaurant1 };
    newRestaurant.isFavorite = true;

    const EXPECTED_RESULT = [restaurant2, restaurant3, newRestaurant];

    const newRestaurants = restaurantCollection.update(newRestaurant);

    expect(newRestaurants).to.deep.equal(EXPECTED_RESULT);
  });
});
