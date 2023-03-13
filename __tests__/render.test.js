/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { screen } from "@testing-library/dom";
import RestaurantItem from "../src/UI/RestaurantItem.js";
import FilterBar from "../src/UI/FilterBar";

describe("렌더링 테스트", () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <section class="restaurant-filter-container"></section>
    <section class="restaurant-list-container">
        <ul class="restaurant-list" data-testid="restaurant-list">
        </ul>
        </section>`;
  });
  test("레스토랑 추가 시 진대감이라는 텍스트가 document 하위에 존재하여야 한다.", () => {
    const restaurant = {
      category: "한식",
      name: "진대감",
      distance: "5",
      id: 100,
      favorite: true,
    };
    const restaurantItem = new RestaurantItem();
    restaurantItem.render(restaurant);

    expect(screen.getByText("진대감")).toBeInTheDocument;
  });
  test("레스토랑 목록에 세 개의 음식점을 추가하였기 때문에, 레스토랑 목록의 child는 세 개여야 한다.", () => {
    const restaurantList = [
      {
        category: "일식",
        name: "오또상스시",
        distance: "10",
        id: 100,
        favorite: true,
      },
      {
        category: "중식",
        name: "명정루",
        distance: "5",
        id: 100,
        favorite: true,
      },
      {
        category: "기타",
        name: "버거킹",
        distance: "5",
        id: 100,
        favorite: true,
      },
    ];

    const restaurantItem = new RestaurantItem();
    const filterBar = new FilterBar(restaurantList, restaurantItem);
    filterBar.render(restaurantList);
    expect(screen.getByTestId("restaurant-list").childElementCount).toBe(3);
  });
});
