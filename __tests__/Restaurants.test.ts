import Restaurants from '../src/domain/Restaurants';

const menu1 = {
  category: '양식',
  name: '카페베네',
  distance: '10',
  description: '너무 맛있어',
  link: 'https://machogalbi.com',
};
describe('Restaurants 클래스 테스트', () => {
  test('addRestaurant 메서드 테스트', () => {
    const restaurants = new Restaurants();
    restaurants.addRestaurant(menu1);

    expect(restaurants.getRestaurants()).toEqual([menu1]);
  });
});
