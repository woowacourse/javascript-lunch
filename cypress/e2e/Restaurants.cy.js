import Restaurants from '../../src/domains/Restaurants.ts';

describe('음식점 목록 테스트', () => {
  const restaurantList = [
    {
      category: '중식',
      name: '중식당',
      walkingTimeFromCampus: 20,
    },
    {
      category: '한식',
      name: '한식당',
      walkingTimeFromCampus: 5,
    },
    {
      category: '한식',
      name: '간식당',
      walkingTimeFromCampus: 5,
    },
    {
      category: '양식',
      name: '양식당',
      walkingTimeFromCampus: 30,
    },
  ];

  it('카테고리별로 음식점 목록을 필터링할 수 있다.', () => {
    const restaurants = new Restaurants();

    restaurantList.forEach((restaurant) => {
      restaurants.addRestaurant(restaurant);
    });

    expect(
      restaurants.filterByCategory('한식').every((restaurant) => restaurant.category === '한식'),
    ).to.be.true;
  });

  it('거리순으로 음식점 목록을 정렬한다. 단, 거리가 같을 시, 이름순으로 정렬한다.', () => {
    const restaurants = new Restaurants();
    const result = [
      {
        category: '한식',
        name: '간식당',
        walkingTimeFromCampus: 5,
      },
      {
        category: '한식',
        name: '한식당',
        walkingTimeFromCampus: 5,
      },
      {
        category: '중식',
        name: '중식당',
        walkingTimeFromCampus: 20,
      },
      {
        category: '양식',
        name: '양식당',
        walkingTimeFromCampus: 30,
      },
    ];

    restaurantList.forEach((restaurant) => {
      restaurants.addRestaurant(restaurant);
    });

    expect(restaurants.orderByDistance()).to.deep.equal(result);
  });
});
