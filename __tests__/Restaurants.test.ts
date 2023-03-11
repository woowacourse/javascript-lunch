import Restaurants from '../src/domain/Restaurants';
import { IRestaurant } from '../src/types';

describe('Restaurants.addRestaurant', () => {
  test('음식점을 추가하면, 음식점 리스트에 맨 뒤에 추가된다.', () => {
    const restaurants = new Restaurants([]);

    const restaurant: IRestaurant = {
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
  test('메서드가 실행되면, id값에 해당하는 음식점 객체의 isFavorite(Boolean) 값이 반대가 된다.', () => {
    const restaurants = new Restaurants([]);

    const restaurant: IRestaurant = {
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
