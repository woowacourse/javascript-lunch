import Restaurants from '../src/domain/models/Restaurants';

describe('도메인 로직 테스트', () => {
  const initialRestaurants = [
    {
      id: '1',
      name: '가',
      category: '한식',
      takeMinute: 30,
      favorite: false,
    },
    {
      id: '2',
      name: '하',
      category: '일식',
      takeMinute: 5,
      favorite: false,
    },
    {
      id: '3',
      name: '자',
      category: '일식',
      takeMinute: 15,
      favorite: true,
    },
  ];

  test.each([
    [initialRestaurants, '전체', 'name', ['1', '3', '2']],
    [initialRestaurants, '전체', 'takeMinute', ['2', '3', '1']],
    [initialRestaurants, '한식', 'name', ['1']],
    [initialRestaurants, '일식', 'name', ['3', '2']],
    [initialRestaurants, '일식', 'takeMinute', ['2', '3']],
    [initialRestaurants, '아시아', 'name', []],
  ])(
    `음식점이 $p, 카테고리가 %p, 정렬기준이 %p 일 때, 필터링 된 음식점 id 결과는 %p 이다.`,
    (restaurants, category, sorting, expectedIdList) => {
      const resultIdList = new Restaurants(restaurants)
        .getFiltered(category, sorting)
        .map((restaurant) => restaurant.id);

      expect(resultIdList).toEqual(expectedIdList);
    }
  );

  test.each([[initialRestaurants, ['3']]])(
    `음식점이 %p 일 때, 좋아하는 음식점 id 결과는 %p 이다.`,
    (restaurants, expectedIdList) => {
      const resultIdList = new Restaurants(restaurants)
        .getFavorite()
        .map((restaurant) => restaurant.id);

      expect(resultIdList).toEqual(expectedIdList);
    }
  );
});
