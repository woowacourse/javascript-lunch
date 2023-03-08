/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { categoryChinese } from "../src/assets";
import RestaurantList from "../src/components/RestaurantList";
import Controller from "../src/domain/Controller";

describe("RestaurantItem, RestaurantList component render 테스트", () => {
  test("추가된 RestaurantItem이 RestaurantList에 있는지 확인한다.", () => {
    const controller = Controller.getInstance();

    customElements.define("restaurant-list", RestaurantList);
    document.body.innerHTML = `
      <restaurant-list id="restaurantList"></restaurant-list>
    `;
    const restaurantList = document.getElementById("restaurantList");

    controller.addRestaurant({
      category: "중식",
      name: "봉피양",
      distance: 10,
      description: "왕",
    });
    const result = `
      <li class="restaurant">
        <div class="restaurant__category">
          <img src="${categoryChinese}" alt="중식" class="category-icon">
        </div>
        <div class="restaurant__info">
          <h3 class="restaurant__name text-subtitle">봉피양</h3>
          <span class="restaurant__distance text-body">캠퍼스부터 10분 내</span>
          <p class="restaurant__description text-body">왕</p>
        </div>
      </li>
    `;
    expect(restaurantList).toContainHTML(result);
  });
});
