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

describe('Name of the group', () => {
  test('음식점들을 카테고리별로 필터링한다.', () => {
    const category = '일식';
    const filteredRestaurants = restaurants.filterByCategory(category);
    const isFiltered = filteredRestaurants.every((restaurant) => restaurant.category === category);

    expect(isFiltered).toBe(true);
  });

  test('음식점을 이름순으로 정렬한다.', () => {
    const sortedRestaurants = restaurants.sortByName();
    const names = sortedRestaurants.map((restaurant) => restaurant.name);

    expect(names).toEqual([
      '도스타코스 선릉점',
      '이태리키친',
      '잇쇼우',
      '친친',
      '피양콩할머니',
      '호아빈 삼성점',
    ]);
  });
});
