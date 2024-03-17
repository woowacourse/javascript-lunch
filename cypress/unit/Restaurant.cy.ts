import { IRestaurant } from '../../src/types/Restaurant';
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
      id: 1,
      name: '친친',
      distance: 10,
      category: '중식',
      description: '게살볶음밥',
      isFavorite: true,
    };

    const restaurant = new Restaurant(RESTAURANT_ARGS);
    expect(restaurant.get()).to.deep.equal(EXPECTED_RESULT);
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
  it('즐겨찾기가 성공적으로 false로 변경된다.', () => {
    const RESTAURANT_ARGS: IRestaurant = {
      id: 1,
      name: '친친',
      distance: 10,
      category: '중식',
      description: '게살볶음밥',
      isFavorite: true,
    };

    const restaurant = new Restaurant(RESTAURANT_ARGS);
    restaurant.toggleChangeIsFavorite();
    expect(restaurant.isFavorite).to.equal(false);
  });
  it('즐겨찾기가 성공적으로 true로 변경된다.', () => {
    const RESTAURANT_ARGS: IRestaurant = {
      id: 1,
      name: '친친',
      distance: 10,
      category: '중식',
      description: '게살볶음밥',
      isFavorite: false,
    };

    const restaurant = new Restaurant(RESTAURANT_ARGS);
    restaurant.toggleChangeIsFavorite();
    expect(restaurant.isFavorite).to.equal(true);
  });
});
