import type { Restaurant } from "../src/types/restaurant";
import Restaurants from "../src/domain/Restaurants";

const mockList: Restaurant[] = [
  {
    id: "1",
    category: "일식",
    name: "스시야좋아",
    distance: 15,
    isFavorite: false,
  },
  {
    id: "2",
    category: "아시안",
    name: "쌀국수맛있다",
    distance: 20,
    isFavorite: true,
  },
  {
    id: "3",
    category: "한식",
    name: "경주 은희네 해장국",
    distance: 10,
    isFavorite: true,
  },
];

test("새로운 음식점을 음식점 리스트에 추가한다.", () => {
  const restaurants = new Restaurants(mockList);
  restaurants.add({
    id: "4",
    category: "한식",
    name: "제주 은희네 해장국",
    distance: 5,
    isFavorite: false,
  });

  expect(restaurants.getList()).toMatchObject([
    {
      id: "1",
      category: "일식",
      name: "스시야좋아",
      distance: 15,
      isFavorite: false,
    },
    {
      id: "2",
      category: "아시안",
      name: "쌀국수맛있다",
      distance: 20,
      isFavorite: true,
    },
    {
      id: "3",
      category: "한식",
      name: "경주 은희네 해장국",
      distance: 10,
      isFavorite: true,
    },
    {
      id: "4",
      category: "한식",
      name: "제주 은희네 해장국",
      distance: 5,
      isFavorite: false,
    },
  ]);
});

test("해당 id값의 레스토랑을 가져온다.", () => {
  const restaurants = new Restaurants(mockList);
  const targetRestaurant = restaurants.getTargetRestaurant("1");

  expect(targetRestaurant).toStrictEqual({
    id: "1",
    category: "일식",
    name: "스시야좋아",
    distance: 15,
    isFavorite: false,
  });
});

test("해당 id값의 레스토랑 삭제한다.", () => {
  const restaurants = new Restaurants(mockList);
  restaurants.deleteTargetRestaurant("1");

  expect(restaurants.getList()).toMatchObject([
    {
      id: "2",
      category: "아시안",
      name: "쌀국수맛있다",
      distance: 20,
      isFavorite: true,
    },
    {
      id: "3",
      category: "한식",
      name: "경주 은희네 해장국",
      distance: 10,
      isFavorite: true,
    },
  ]);
});

test("해당 id의 레스토랑의 즐겨찾기 여부를 변경할 수 있다.", () => {
  const restaurants = new Restaurants(mockList);
  restaurants.toggleTargetRestaurantFavorite("1");

  expect(restaurants.getList()).toMatchObject([
    {
      id: "1",
      category: "일식",
      name: "스시야좋아",
      distance: 15,
      isFavorite: true,
    },
    {
      id: "2",
      category: "아시안",
      name: "쌀국수맛있다",
      distance: 20,
      isFavorite: true,
    },
    {
      id: "3",
      category: "한식",
      name: "경주 은희네 해장국",
      distance: 10,
      isFavorite: true,
    },
  ]);
});
