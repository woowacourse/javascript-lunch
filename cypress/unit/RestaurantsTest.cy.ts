import { IRestaurant } from "../../src/domain/interface/IRestaurant";
import {
  IRestaurantManager,
  RestaurantManager,
} from "../../src/domain/RestaurantManager";

describe("음식점 목록 테스트", () => {
  it("음식점을 추가하면 정상적으로 추가되었는지 확인한다.", () => {
    // given
    const newRestaurant: IRestaurant = {
      category: "중식",
      name: "친친",
      walkingTime: 5,
    };

    const restaurantManager: IRestaurantManager = new RestaurantManager([]);

    // when
    restaurantManager.add(newRestaurant);

    // then
    expect(restaurantManager.getRestaurantList()).to.eql(([newRestaurant]);
  });

  it("음식점을 이름순으로 정렬해 반환한다.", () => {
    // given
    const localStorageRestaurants: IRestaurant[] = [
      {
        category: "한식",
        name: "바",
        walkingTime: 5,
      },
      {
        category: "한식",
        name: "가",
        walkingTime: 5,
      },
      {
        category: "한식",
        name: "나",
        walkingTime: 5,
      },
      {
        category: "한식",
        name: "마녀김밥",
        walkingTime: 5,
      },
    ];
    const restaurantManager: IRestaurantManager = new RestaurantManager(
      localStorageRestaurants
    );
    const sortedByAscendingName: IRestaurant[] = [
      {
        category: "한식",
        name: "가",
        walkingTime: 5,
      },
      {
        category: "한식",
        name: "나",
        walkingTime: 5,
      },
      {
        category: "한식",
        name: "마녀김밥",
        walkingTime: 5,
      },
      {
        category: "한식",
        name: "바",
        walkingTime: 5,
      },
    ];

    // then
    expect(restaurantManager.sortByAscendingName()).to.eql(
      sortedByAscendingName
    );
  });

  it("음식점을 거리순으로 정렬해 반환한다.", () => {
    // given
    const localStorageRestaurants: IRestaurant[] = [
      {
        category: "한식",
        name: "바",
        walkingTime: 30,
      },
      {
        category: "한식",
        name: "간",
        walkingTime: 5,
      },
      {
        category: "한식",
        name: "가",
        walkingTime: 5,
      },
      {
        category: "한식",
        name: "나",
        walkingTime: 20,
      },
      {
        category: "한식",
        name: "마녀김밥",
        walkingTime: 10,
      },
    ];
    const restaurantManager: IRestaurantManager = new RestaurantManager(
      localStorageRestaurants
    );
    const sortedByAscendingWalkingTime: IRestaurant[] = [
      {
        category: "한식",
        name: "가",
        walkingTime: 5,
      },
      {
        category: "한식",
        name: "간",
        walkingTime: 5,
      },
      {
        category: "한식",
        name: "마녀김밥",
        walkingTime: 10,
      },
      {
        category: "한식",
        name: "나",
        walkingTime: 20,
      },
      {
        category: "한식",
        name: "바",
        walkingTime: 30,
      },
    ];

    // then
    expect(restaurantManager.sortByAscendingWalkingTime()).to.eql(
      sortedByAscendingWalkingTime
    );
  });

  it("입력받은 카테고리로 필터링된 메뉴 목록 반환한다.", () => {
    // given
    const newRestaurant: IRestaurant = {
      category: "중식",
      name: "친친",
      walkingTime: 5,
    };

    const restaurantManager: IRestaurantManager = new RestaurantManager([]);

    // when
    restaurantManager.add(newRestaurant);

    // then
    expect(restaurantManager.getRestaurantList()).to.eql(([newRestaurant]);
  });

  const totalRestaurants: IRestaurants[] = [
    {
      category: "중식",
      name: "가",
      walkingTime: 5,
    },
    {
      category: "한식",
      name: "마녀김밥",
      walkingTime: 10,
    },
    {
      category: "한식",
      name: "나",
      walkingTime: 20,
    },
    {
      category: "일식",
      name: "바",
      walkingTime: 30,
    },
  ];

  const testData = [
    {
      category: "중식",
      filteredRestaurants: [
        {
          category: "중식",
          name: "가",
          walkingTime: 5,
        },
      ],
    },
    {
      category: "일식",
      filteredRestaurants: [
        {
          category: "일식",
          name: "바",
          walkingTime: 30,
        },
      ],
    },
    {
      category: "한식",
      filteredRestaurants: [
        {
          category: "한식",
          name: "마녀김밥",
          walkingTime: 10,
        },
        {
          category: "한식",
          name: "나",
          walkingTime: 20,
        },
      ],
    },
  ];

  testData.forEach(({ category, filteredRestaurants }) => {
    it(`${category}로 정렬한 결과를 받아온다.`, () => {
      // given
      const newRestaurant: IRestaurant = {
        category: "중식",
        name: "친친",
        walkingTime: 5,
      };

      const restaurantManager: IRestaurantManager = new RestaurantManager(
        totalRestaurants
      );

      // then
      expect(restaurantManager.filteredRestaurants(newRestaurant)).to.eql(
        filteredRestaurants
      );
    });
  });
});
