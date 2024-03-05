import { Category, IRestaurant } from '../../src/types/Restaurant';
import Restaurant from '../../src/domains/entities/Restuarant';

class RestaurantList {
  restaurantList: Restaurant[];

  constructor(restaurants: IRestaurant[]) {
    this.restaurantList = restaurants.map((restaurant: IRestaurant) => new Restaurant(restaurant));
  }

  get() {
    return this.restaurantList.map((restaurant) => restaurant.get());
  }

  filterByCategory(category: Category) {
    return this.restaurantList
      .filter((restaurant) => restaurant.get().category === category)
      .map((restaurant) => restaurant.get());
  }

  sortByName() {
    return this.restaurantList
      .sort((a, b) => a.get().name.localeCompare(b.get().name))
      .map((restaurant) => restaurant.get());
  }

  sortByDistance() {
    return this.restaurantList
      .sort((a, b) => a.get().distance - b.get().distance)
      .map((restaurant) => restaurant.get());
  }

  addRestaurant(restaurantArg: IRestaurant) {
    const restaurants = this.restaurantList.map((restaurant) => {
      return JSON.stringify(restaurant.get());
    });
    if (restaurants.includes(JSON.stringify(restaurantArg))) {
      throw new Error('[ERROR] 이미 존재하는 음식점입니다.');
    }
    const restaurant = new Restaurant(restaurantArg);
    this.restaurantList.push(restaurant);
  }
}

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

  it('인자로 음식점 배열을 받아서, 잘 반환한다.', () => {
    const RESTAURANTS: IRestaurant[] = [restaurant1, restaurant2];
    const restaurantList = new RestaurantList(RESTAURANTS);
    expect(restaurantList.get()).to.deep.equal([restaurant1, restaurant2]);
  });

  it('인자로 받은 카테고리로 음식점을 잘 필터링한다.', () => {
    const RESTAURANTS: IRestaurant[] = [restaurant1, restaurant2];
    const restaurantList = new RestaurantList(RESTAURANTS);
    expect(restaurantList.filterByCategory('중식')).to.deep.equal([restaurant1]);
  });

  it('이름순 정렬을 요청받았을 때, 잘 정렬된 결과를 반환한다.', () => {
    const RESTAURANTS = [restaurant1, restaurant2, restaurant3];
    const EXPECTED_RESULT = [restaurant3, restaurant2, restaurant1];
    const restaurantList = new RestaurantList(RESTAURANTS);
    expect(restaurantList.sortByName()).to.deep.equal(EXPECTED_RESULT);
  });

  it('거리순 정렬을 요청받았을 때, 잘 정렬된 결과를 반환한다.', () => {
    const RESTAURANTS = [restaurant1, restaurant2, restaurant3];
    const EXPECTED_RESULT = [restaurant2, restaurant3, restaurant1];
    const restaurantList = new RestaurantList(RESTAURANTS);
    expect(restaurantList.sortByDistance()).to.deep.equal(EXPECTED_RESULT);
  });

  it('새로운 음식점을 정상적으로 잘 추가한다.', () => {
    const newRstaurant: IRestaurant = {
      name: '꺼벙이 김밥',
      distance: 5,
      category: '한식',
      description: '돈가스김밥 추천',
    };
    const RESTAURANTS = [restaurant1, restaurant2, restaurant3];
    const restaurantList = new RestaurantList(RESTAURANTS);

    restaurantList.addRestaurant(newRstaurant);

    expect(restaurantList.get()).to.deep.equal([
      restaurant1,
      restaurant2,
      restaurant3,
      newRstaurant,
    ]);
  });

  it('중복된 음식점이 이미 있을 경우 에러를 반환한다.', () => {
    const newRstaurant: IRestaurant = { ...restaurant1 };
    const RESTAURANTS = [restaurant1, restaurant2, restaurant3];
    const restaurantList = new RestaurantList(RESTAURANTS);

    expect(() => restaurantList.addRestaurant(newRstaurant)).to.throw('[ERROR]');
  });
});
