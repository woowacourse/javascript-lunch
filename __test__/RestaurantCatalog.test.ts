import RestaurantCatalog from '../src/domain/RestaurantCatalog.ts';

describe('RestaurantCatalog 예외 테스트', () => {
  const invalidRestaurantCase = [
    {
      category: '한식',
      name: '반포식스',
      distanceFromCampus: 5,
    },
    {
      category: '한식',
      name: '반포식스',
      distanceFromCampus: 5,
    },
  ];

  test.each(invalidRestaurantCase)('중복된 이름의 음식점이 추가되면 에러가 발생한다.', (input) => {
    const newRestaurantCatalog = new RestaurantCatalog();
    newRestaurantCatalog.pushNewRestaurant(input);

    expect(() => {
      newRestaurantCatalog.pushNewRestaurant(input);
    }).toThrow('❌');
  });
});

describe('RestaurantCatalog 기능 테스트', () => {
  const validRestaurantCase = [
    {
      category: '한식',
      name: '반포식스',
      distanceFromCampus: 5,
    },
    {
      category: '양식',
      name: '빕스',
      distanceFromCampus: 5,
    },
  ];

  const newRestaurantCatalog = new RestaurantCatalog();

  validRestaurantCase.forEach((restaurantInfo) => {
    newRestaurantCatalog.pushNewRestaurant(restaurantInfo);
  });

  test('두개의 음식점을 추가하면 두개의 음식점이 추가된다.', () => {
    expect(newRestaurantCatalog.getRestaurants().length).toEqual(2);
  });

  test('category 필터링 테스트', () => {
    expect(newRestaurantCatalog.filterByCategory('한식')[0].getInfo().name).toEqual('반포식스');
  });

  test('이름순으로 정렬', () => {
    expect(newRestaurantCatalog.sortByName()[0].getInfo().name).toEqual('반포식스');
  });

  // test('거리순으로 정렬', () => {
  //   expect(newRestaurantCatalog.getRestaurants().length).toEqual(2);
  // });
});
