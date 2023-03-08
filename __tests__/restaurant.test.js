import { restaurants } from '../src/domain/Restaurant';

test('새로운 음식점을 추가한다', () => {
  const newRestaurant = {
    category: '한식',
    name: '김돈이',
    distance: 5,
    description: '제육볶음이 맛있는 한식집',
    link: 'link',
  };
  restaurants.add(newRestaurant);

  expect(restaurants.list).toEqual([newRestaurant]);
});
