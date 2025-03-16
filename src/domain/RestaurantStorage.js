import Restaurant from './Restaurant.js';
import Restaurants from './Restaurants.js';

class RestaurantStorage {
  static #STORAGE_KEY = 'restaurants';

  static getRestaurants() {
    const storedData = localStorage.getItem(this.#STORAGE_KEY);

    if (!storedData) {
      // 초기 데이터 저장
      const initialData = [
        new Restaurant(
          '피양콩할마니',
          '10',
          '평양 출신의 할머니가 수십 년간 운영해온 비지 전문점 피양콩 할마니. 두부를 빼지 않은 되비지를 맛볼 수 있는 곳으로, ‘피양’은 평안도 사투리로 ‘평양’을 의미한다.',
          'korean',
          '',
          true,
        ),
        new Restaurant(
          '친친',
          '5',
          'Since 2004 편리한 교통과 주차, 그리고 관록만큼 깊은 맛과 정성으로 정통 중식의 세계를 펼쳐갑니다',
          'chinese',
          '',
          true,
        ),
        new Restaurant(
          '잇쇼우',
          '10',
          '잇쇼우는 정통 자가제면 사누끼 우동이 대표메뉴입니다. 기술은 정성을 이길 수 없다는 신념으로 모든 음식에최선을 다하는 잇쇼우는 고객 한분 한분께 최선을 다하겠습니다',
          'japanese',
          '',
          false,
        ),
        new Restaurant('이태리키친', '20', '늘 변화를 추구하는 이태리키친입니다.', 'western', '', false),
        new Restaurant('호아빈 삼성점', '15', '푸짐한 양에 국물이 일품인 쌀국수', 'asian', '', true),
        new Restaurant('나아빈 삼성점', '30', '푸짐한 양에 국물이 일품인 쌀국수', 'asian', '', false),
        new Restaurant('가아빈 삼성점', '10', '푸짐한 양에 국물이 일품인 쌀국수', 'asian', '', true),
        new Restaurant('도스타코스 선릉점', '5', '멕시칸 캐주얼 그릴', 'etc', '', true),
      ];

      const restaurants = new Restaurants(initialData);
      this.saveRestaurants(restaurants);
      return restaurants;
    }

    try {
      const parsedData = JSON.parse(storedData);
      const restaurantList = parsedData.map(
        (item) => new Restaurant(item.name, item.distance, item.description, item.category, item.link, item.like),
      );
      return new Restaurants(restaurantList);
    } catch (error) {
      alert(error.message);
      return [];
    }
  }

  static saveRestaurants(restaurants) {
    // 로컬스토리지는 문자열만 저장 가능 = 겍체저장 불가능 -> 직렬화를 해줘야 함 *****
    const restaurantArray = restaurants.getAll();
    console.log(restaurants, '===');
    const serializableData = restaurantArray.map((restaurant) => ({
      name: restaurant.getName(),
      distance: restaurant.getDistance(),
      description: restaurant.getDescription(),
      category: restaurant.getCategory(),
      link: restaurant.getLink(),
      like: restaurant.getLike(),
    }));

    localStorage.setItem(this.#STORAGE_KEY, JSON.stringify(serializableData));
  }

  static addRestaurant(restaurant) {
    const restaurants = this.getRestaurants();
    restaurants.add(restaurant);
    this.saveRestaurants(restaurants);
    return restaurants;
  }

  static deleteRestaurant(restaurantName) {
    const restaurants = this.getRestaurants();
    restaurants.delete(restaurantName);
    this.saveRestaurants(restaurants);
    return restaurants;
  }

  static updateRestaurantLike(restaurantName, like) {
    const restaurants = this.getRestaurants();
    restaurants.updateLike(restaurantName, like);
    this.saveRestaurants(restaurants);
    return restaurants;
  }
}

export default RestaurantStorage;
