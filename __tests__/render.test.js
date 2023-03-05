/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { screen } from "@testing-library/dom";
import RestaurantItem from "../src/UI/RestaurantItem.js";
import FilterBar from "../src/UI/FilterBar";

describe("렌더링 테스트", () => {
  beforeEach(() => {
    document.body.innerHTML = `<section class="restaurant-list-container">
        <ul class="restaurant-list" data-testid="restaurant-list">
        </ul>
        </section>`;
  });
  test("레스토랑 추가 시 컴포넌트 생성", () => {
    const restaurant = {
      category: "한식",
      name: "진대감",
      distance: "5",
    };
    const restaurantItem = new RestaurantItem();
    restaurantItem.render(restaurant);

    expect(screen.getByText("진대감")).toBeInTheDocument;
  });
  test("레스토랑 목록 출력 정상 작동 확인", () => {
    const restaurantList = [
      {
        category: "일식",
        name: "오또상스시",
        distance: "10",
      },
      {
        category: "중식",
        name: "명정루",
        distance: "5",
      },
      {
        category: "기타",
        name: "버거킹",
        distance: "5",
      },
    ];

    const restaurantItem = new RestaurantItem();
    const filterBar = new FilterBar(restaurantList, restaurantItem);
    filterBar.render(restaurantList);

    expect(screen.getByTestId("restaurant-list").childElementCount).toBe(3);
  });
});
