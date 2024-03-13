import { IRestaurant, IRestaurantInfo } from '../../src/types/Restaurant';
import Restaurant from '../../src/domains/entities/Restaurant';

describe('레스토랑 클래스', () => {
  it('새로운 음식점 도메인이 성공적으로 만들어진다.', () => {
    const RESTAURANT_ARGS: IRestaurant = {
      id: 1,
      name: '친친',
      distance: 10,
      category: '중식',
      description: '게살볶음밥',
      isFavorite: true,
    };
    const EXPECTED_RESULT: IRestaurant = {
      id: 2,
      name: '친친',
      distance: 10,
      category: '중식',
      description: '게살볶음밥',
      isFavorite: true,
    };

    const restaurant = new Restaurant(RESTAURANT_ARGS);
    expect(restaurant.get()).to.deep.equal(EXPECTED_RESULT);
  });
});

it('500자 초과의 인자가 들어올 때, 에러를 반환한다.', () => {
  const INVALID_DESCRIPTION = 'a'.repeat(501);
  const RESTAURANT_ARGS: IRestaurant = {
    id: 1,
    name: '친친',
    distance: 10,
    category: '중식',
    description: INVALID_DESCRIPTION,
    isFavorite: false,
  };
  expect(() => new Restaurant(RESTAURANT_ARGS)).to.throw('[ERROR]');
});
it('없는 속성을 꺼냈을 때 에러를 반환하지 않는다.', () => {
  const RESTAURANT_ARGS: IRestaurant = {
    id: 2,
    name: '친친',
    distance: 10,
    category: '중식',
    link: '',
    isFavorite: false,
  };
  const restaurant = new Restaurant(RESTAURANT_ARGS);
  expect(() => restaurant.get().link).not.to.throw();
});

describe('잘못된 길이의 이름이 인자로 들어올 때, 에러를 반환한다.', () => {
  it('인자로 들어온 이름의 길이가 0일 때, 에러를 반환한다.', () => {
    const INVALID_NAME = '';
    const RESTAURANT_ARGS: IRestaurant = {
      id: 1,
      name: INVALID_NAME,
      distance: 10,
      category: '중식',
      isFavorite: false,
    };
    expect(() => new Restaurant(RESTAURANT_ARGS)).to.throw('[ERROR]');
  });
  it('인자로 들어온 이름의 길이가 20을 넘을 때, 에러를 반환한다.', () => {
    const INVALID_NAME = '세상에서가장짜장면과탕수육을잘하는중국음식점';
    const RESTAURANT_ARGS: IRestaurant = {
      id: 2,
      name: INVALID_NAME,
      distance: 10,
      category: '중식',
      isFavorite: false,
    };
    expect(() => new Restaurant(RESTAURANT_ARGS)).to.throw('[ERROR]');
  });
});
