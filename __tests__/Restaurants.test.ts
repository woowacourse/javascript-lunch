import Restaurants from '../src/domain/Restaurants';

const menu1 = {
  category: '양식',
  name: '카페베네',
  distance: '10',
  description: '너무 맛있어',
  link: 'https://machogalbi.com',
};

const menu2 = {
  category: '한식',
  name: '마초갈비',
  distance: '20',
  description: '너무 맛있어',
  link: 'https://machogalbi.com',
};

const menu3 = {
  category: '중식',
  name: '간다간다뿅간다 짜장',
  distance: '30',
  description: '너무 맛있어',
  link: 'https://machogalbi.com',
};

describe('Restaurants 클래스 테스트', () => {
  test('addRestaurant 메서드 테스트', () => {
    const restaurants = new Restaurants();
    restaurants.addRestaurant(menu1);

    expect(restaurants.getRestaurants()).toEqual([menu1]);
  });

  test('sortByName 메서드 테스트', () => {
    const restaurants = new Restaurants();
    restaurants.addRestaurant(menu1);
    restaurants.addRestaurant(menu2);
    restaurants.addRestaurant(menu3);

    expect(restaurants.sortByName()).toEqual([menu3, menu2, menu1]);
  });
});
