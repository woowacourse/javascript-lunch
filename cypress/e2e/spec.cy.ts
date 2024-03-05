import { Category, IRestaurant, Distance } from '../../src/types/Restaurant';
class Restaurant implements IRestaurant {
  name: string;
  distance: Distance;
  category: Category;
  description?: string;
  link?: string;

  constructor(restaurantArgs: IRestaurant) {
    this.name = restaurantArgs.name;
    this.distance = restaurantArgs.distance;
    this.category = restaurantArgs.category;
    this.description = restaurantArgs.description;
    this.link = restaurantArgs.link;
    this.#validateName();
    this.#validateDescription();
  }

  getName() {
    return this.name;
  }

  #validateName() {
    if (!this.name.length || this.name.length > 20) {
      throw new Error('[ERROR] 이름의 길이는 1~20자 여야 합니다.');
    }
  }
  #validateDescription() {
    if (this.description && this.description.length > 500) {
      throw new Error('[ERROR] 음식점 설명 길이는 500자를 초과할 수 없습니다.');
    }
  }
}

describe('레스토랑 클래스', () => {
  it('성공 케이스', () => {
    const RESTAURANT_ARGS: IRestaurant = {
      name: '친친',
      distance: 10,
      category: '중식',
      description: '게살볶음밥',
    };
    const restaurant = new Restaurant(RESTAURANT_ARGS);
    expect(restaurant.getName()).to.equal('친친');
  });

  describe('잘못된 길이의 이름이 인자로 들어올 때, 에러를 반환한다.', () => {
    it('인자로 들어온 이름의 길이가 0일 때, 에러를 반환한다.', () => {
      const INVALID_NAME = '';
      const RESTAURANT_ARGS: IRestaurant = {
        name: INVALID_NAME,
        distance: 10,
        category: '중식',
      };
      expect(() => new Restaurant(RESTAURANT_ARGS)).to.throw('[ERROR]');
    });
    it('인자로 들어온 이름의 길이가 20을 넘을 때, 에러를 반환한다.', () => {
      const INVALID_NAME = '세상에서가장짜장면과탕수육을잘하는중국음식점';
      const RESTAURANT_ARGS: IRestaurant = {
        name: INVALID_NAME,
        distance: 10,
        category: '중식',
      };
      expect(() => new Restaurant(RESTAURANT_ARGS)).to.throw('[ERROR]');
    });
  });

  it('500자 초과의 인자가 들어올 때, 에러를 반환한다.', () => {
    const INVALID_DESCRIPTION = 'a'.repeat(501);
    const RESTAURANT_ARGS: IRestaurant = {
      name: '친친',
      distance: 10,
      category: '중식',
      description: INVALID_DESCRIPTION,
    };

    expect(() => new Restaurant(RESTAURANT_ARGS)).to.throw('[ERROR]');
  });
});
