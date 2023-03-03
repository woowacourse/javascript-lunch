/**
 * @jest-environment jsdom
 */
import "../src/constants/images";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/dom";
import renderList from "../src/components/RestaurantList";

document.body.innerHTML = `<ul class="restaurant-list" data-testid="restaurant-list"></ul>`;

describe("UI 테스트", () => {
  test("음식점 추가 시 목록에 추가된다.", () => {
    const restaurants = [{ category: "한식", name: "평래옥", distance: 5 }];
    renderList(restaurants);

    expect(screen.getByText("평래옥")).toBeInTheDocument();
  });

  test("음식점 추가 시 목록에 추가된다.", () => {
    const restaurants = [
      { category: "한식", name: "평래옥", distance: 5 },
      {
        category: "중식",
        name: "딘타이펑",
        distance: 30,
        description: "샤오롱바오 맛집",
      },
      {
        category: "중식",
        name: "명정루",
        distance: 10,
        description: "짜장면 맛집",
      },
      { category: "양식", name: "애슐리", distance: 10 },
    ];
    renderList(restaurants);

    expect(screen.getByTestId("restaurant-list").childElementCount).toBe(4);
  });
});
