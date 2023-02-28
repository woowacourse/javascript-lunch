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
