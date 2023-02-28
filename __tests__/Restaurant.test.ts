import Restaurant from "../src/domain/Restaurant";
describe("Restaurant 클래스 테스트", () => {
  test("Restaurant 객체를 생성하면 해당 정보를 저장한다.", () => {
    //given
    const data = {
      name: "레스토랑",
      category: "중식",
      distance: 5,
      description: "맛있는 식당입니다",
      url: "naver.com",
    };

    //when
    const restaurant = new Restaurant(Object.assign(data));
    const restaurantInfo = restaurant.getInfo();

    //then
    expect(restaurantInfo).toEqual(data);
  });
});
