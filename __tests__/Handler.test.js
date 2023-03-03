import restaurantListHandler from "../src/domain/restaurantListHandler";

describe("정렬이 제대로 되고 있는지 테스트", () => {
  let restaurants;

  beforeEach(() => {
    restaurants = [
      {
        name: "리리리",
        distance: "20",
        category: "일식",
        link: "",
        description: "",
      },
      {
        name: "히히히",
        distance: "15",
        category: "중식",
        link: "",
        description: "",
      },
      {
        name: "가나다",
        distance: "5",
        category: "한식",
        link: "",
        description: "",
      },
    ];
  });

  test("이룸순 정렬 테스트", () => {
    const expectRestaurants = [
      {
        name: "가나다",
        distance: "5",
        category: "한식",
        link: "",
        description: "",
      },
      {
        name: "리리리",
        distance: "20",
        category: "일식",
        link: "",
        description: "",
      },
      {
        name: "히히히",
        distance: "15",
        category: "중식",
        link: "",
        description: "",
      },
    ];

    const nameSortingResult =
      restaurantListHandler.getSortedByName(restaurants);

    expect(nameSortingResult).toEqual(expectRestaurants);
  });
});
