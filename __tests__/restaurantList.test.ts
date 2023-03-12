import { CATEGORY } from '../src/data/Constants';
import { RestaurantList } from '../src/domain/RestaurantList';
import { Restaurant } from '../src/type/Restaurant';
import { restaurants } from '../src/data/dummyData';

const restaurantList = new RestaurantList(restaurants);

test('카테고리가 일치하는 음식점을 필터링', () => {
  CATEGORY.forEach((category) => {
    expect(restaurantList.getByCategory(category)[0].category).toBe(category);
  });
});

describe('조건에 따라 정렬', () => {
  const list = restaurantList.getByCategory('전체');

  test('이름순 정렬', () => {
    expect(restaurantList.sortByName(list)[0].name).toBe('도스타코스 선릉점');
    expect(restaurantList.sortByName(list)[5].name).toBe('호아빈 삼상점');
  });

  test('거리순 정렬', () => {
    expect(restaurantList.sortByDistance(list)[0].distance).toBe(5);
    expect(restaurantList.sortByDistance(list)[5].distance).toBe(20);
  });
});

describe('음식점 추가 및 제거', () => {
  const example: Restaurant = {
    category: '한식',
    name: '도지울토종순대국',
    distance: 30,
    isFavorite: false,
  };

  test('추가', () => {
    restaurantList.add(example);
    expect(
      restaurantList.getByCategory('한식').find((restaurant) => restaurant.name === example.name),
    ).toBe(example);
  });

  test('제거', () => {
    restaurantList.delete(example.name);
    expect(
      restaurantList.getByCategory('한식').find((restaurant) => restaurant.name === example.name),
    ).toBe(undefined);
  });
});

describe('즐겨찾기 토글', () => {
  const before = restaurantList.getByCategory('전체')[0].isFavorite;
  test('한 번 바꾸기', () => {
    restaurantList.toggleFavorite(restaurantList.getByCategory('전체')[0].name);
    expect(restaurantList.getByCategory('전체')[0].isFavorite).toBe(!before);
  });

  test('원래대로 바꾸기', () => {
    restaurantList.toggleFavorite(restaurantList.getByCategory('전체')[0].name);
    expect(restaurantList.getByCategory('전체')[0].isFavorite).toBe(before);
  });
});
