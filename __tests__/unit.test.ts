import type { Restaurant } from "../src/types/restaurant";
import Restaurants from "../src/domain/Restaurants";

const mockList: Restaurant[] = [
  {
    category: "일식",
    name: "스시야좋아",
    distance: 15,
  },
  {
    category: "아시안",
    name: "쌀국수맛있다",
    distance: 20,
  },
  {
    category: "한식",
    name: "경주 은희네 해장국",
    distance: 10,
  },
];

const restaurants = new Restaurants(mockList);

test("새로운 음식점을 음식점 리스트에 추가한다.", () => {
  restaurants.add({
    category: "한식",
    name: "제주 은희네 해장국",
    distance: 5,
  });

  expect(restaurants.getList()).toMatchObject([
    {
      category: "일식",
      name: "스시야좋아",
      distance: 15,
    },
    {
      category: "아시안",
      name: "쌀국수맛있다",
      distance: 20,
    },
    {
      category: "한식",
      name: "경주 은희네 해장국",
      distance: 10,
    },
    {
      category: "한식",
      name: "제주 은희네 해장국",
      distance: 5,
    },
  ]);
});
