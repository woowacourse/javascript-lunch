import Restaurants, { Restaurant } from "../src/domain/Restaurants";

const mockList: Restaurant[] = [
  {
    category: "한식",
    name: "경주 은희네 해장국",
    distance: 10,
  },
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
];

const restaurants = new Restaurants(mockList);

test.only("새로운 음식점을 음식점 리스트에 추가한다.", () => {
  restaurants.add({
    category: "한식",
    name: "제주 은희네 해장국",
    distance: 5,
  });

  expect(restaurants.getList()).toMatchObject([
    {
      category: "한식",
      name: "경주 은희네 해장국",
      distance: 10,
    },
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
      name: "제주 은희네 해장국",
      distance: 5,
    },
  ]);
});

test("음식점 리스트를 이름순으로 정렬한다.", () => {
  restaurants.sortByName();

  expect(restaurants.list).toMatchObject();
});

test("음식점 리스트를 거리순으로 정렬한다.", () => {
  restaurants.sortByDistance();

  expect().toMatchObject();
});

test("음식점 리스트를 카테고리별로 필터링한다.", () => {
  const filteredList = restaurants.filterByCategory("한식");

  expect(filteredList).toMatchObject([
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
