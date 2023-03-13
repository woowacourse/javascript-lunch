import Restaurants from '../src/domain/Restaurants';
import { Restaurant } from '../src/types';

describe('Restaurants.addRestaurant', () => {
  test('음식점을 추가하면, 음식점 리스트에 맨 뒤에 추가된다.', () => {
    const restaurants = new Restaurants([]);

    const restaurant: Restaurant = {
      id: 1,
      category: '한식',
      name: '돈카라',
      distance: '10',
      isFavorite: false,
    };

    restaurants.addRestaurant(restaurant);

    const restaurantList = restaurants.getRestaurants();
    const addedRestaurant = restaurantList[restaurantList.length - 1];

    expect(addedRestaurant).toEqual(restaurant);
  });
});

describe('Restaurants.toggleFavoriteRestaurant', () => {
  test('id값이 일치하는 음식점 객체의 isFavorite(Boolean) 값이 반대가 된다.', () => {
    const restaurants = new Restaurants([]);

    const restaurant: Restaurant = {
      id: 1,
      category: '한식',
      name: '돈카라',
      distance: '10',
      isFavorite: false,
    };

    restaurants.addRestaurant(restaurant);

    const restaurantId = 1;
    restaurants.toggleFavoriteRestaurant(restaurantId);

    const expected = true;
    const afterFavorite = restaurants.getRestaurants()[0].isFavorite;

    expect(expected).toEqual(afterFavorite);
  });
});

describe('Restaurants.deleteRestaurant', () => {
  test('id값이 일치하는 음식점 객체가 배열에서 삭제된다.', () => {
    const restaurants = new Restaurants([]);

    const restaurant: Restaurant = {
      id: 1,
      category: '한식',
      name: '돈카라',
      distance: '10',
      isFavorite: false,
    };

    restaurants.addRestaurant(restaurant);

    restaurants.deleteRestaurant(1);
    const restaurantList = restaurants.getRestaurants();

    expect(restaurantList).toEqual([]);
  });
});

describe('Restaurants.getRestaurantById', () => {
  test('id값이 일치하는 음식점 객체를 반환한다.', () => {
    const restaurants = new Restaurants([]);

    const restaurant: Restaurant = {
      id: 1,
      category: '한식',
      name: '돈카라',
      distance: '10',
      isFavorite: false,
    };

    restaurants.addRestaurant(restaurant);

    const expectedRestaurant = restaurants.getRestaurantById(1);

    expect(expectedRestaurant).toEqual(restaurant);
  });
});
