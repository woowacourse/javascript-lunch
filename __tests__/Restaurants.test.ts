import Restaurants from '../src/domain/Restaurants';
import { Restaurant } from '../src/types';

test('Restaurants.addRestaurant', () => {
  const restaurants = new Restaurants();

  const restaurant: Restaurant = {
    category: '한식',
    name: '돈카라',
    distance: '10',
  };

  restaurants.addRestaurant(restaurant);
  const addedRestaurant = restaurants.getRestaurants()[0];

  expect(addedRestaurant).toEqual(restaurant);
});
