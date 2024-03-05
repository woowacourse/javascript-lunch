import RestaurantCatalog from '../src/domain/RestaurantCatalog.ts';

describe('RestaurantCatalog 테스트', () => {
  const validRestaurantCase = [
    [
      [
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
      ],
      2,
    ],
    [
      [
        {
          category: '한식',
          name: '반포식스',
          distanceFromCampus: 5,
        },
      ],
      1,
    ],
  ];

  test.each(validRestaurantCase)('두개의 음식점을 추가하면 두개의', (inputs, length) => {
    const newRestaurantCatalog = new RestaurantCatalog();
    for (const input of inputs) {
      newRestaurantCatalog.pushNewRestaurant(input);
    }
    expect(newRestaurantCatalog.getRestaurants().length).toEqual(length);
  });

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
