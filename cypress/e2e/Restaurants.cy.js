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
      category: '양식',
      name: '양식당',
      walkingTimeFromCampus: 30,
    },
    {
      category: '한식',
      name: '한식한식당',
      walkingTimeFromCampus: 5,
    },
  ];

  it('카테고리별로 음식점 목록을 필터링할 수 있다.', () => {
    const restaurants = new Restaurants();
    const result = [
      {
        category: '한식',
        name: '한식당',
        walkingTimeFromCampus: 5,
      },
      {
        category: '한식',
        name: '한식한식당',
        walkingTimeFromCampus: 5,
      },
    ];

    restaurantList.forEach((restaurant) => {
      restaurants.addRestaurant(restaurant);
    });

    expect(restaurants.filterByCategory('한식')).to.deep.equal(result);
  });
});
