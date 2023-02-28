import { restaurants } from '../src/domain/restaurants';

test('새로운 음식점을 추가한다.', () => {
  const newRestaurant = {
    category: '일식',
    name: '돈카라',
    distance: 5,
    description: '상세 설명',
    link: 'link',
  };

  restaurants.add(newRestaurant);

  expect(restaurants.list).toEqual([newRestaurant]);
});

test('음식점들을 카테고리별로 필터링한다.', () => {
  const category = '일식';
  const restaurantList = [
    {
      category: '일식',
      name: '돈카라',
      distance: 5,
      description: '상세 설명',
      link: 'link',
    },
    {
      category: '한식',
      name: '김돈이',
      distance: 5,
      description: '상세 설명',
      link: 'link',
    },
    {
      category: '일식',
      name: '지구당',
      distance: 5,
      description: '상세 설명',
      link: 'link',
    },
  ];
  restaurantList.forEach((restaurant) => restaurants.add(restaurant));
  const filteredRestaurants = restaurants.filterByCategory(category);

  expect(filteredRestaurants.every((restaurant) => restaurant.category === category)).toBe(true);
});
