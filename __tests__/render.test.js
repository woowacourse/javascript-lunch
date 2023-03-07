/**
 * @jest-environment jsdom
 */
import { screen, fireEvent } from "@testing-library/dom";
import "@testing-library/jest-dom";
import { categoryChinese } from "../src/assets";
import NavBar from "../src/components/NavBar";
import RestaurantList from "../src/components/RestaurantList";
import { addRestaurant } from "../src/components/RestaurantList/handleRestaurantList";

describe("NavBar component 테스트", () => {
  test("NavBar가 잘 생성되었는지 확인한다.", () => {
    customElements.define("nav-bar", NavBar);
    document.body.innerHTML = `<nav-bar id="navBar"></nav-bar>`;
    const navBar = document.getElementById("navBar");
    expect(navBar).toBeInTheDocument();
  });
});

describe("RestaurantItem, RestaurantList component 테스트", () => {
  customElements.define("restaurant-list", RestaurantList);
  test("추가된 RestaurantItem이 RestaurantList에 그려졌는지 확인한다.", () => {
    document.body.innerHTML = `
      <restaurant-list id="restaurantList"></restaurant-list>
    `;
    addRestaurant({
      category: "중식",
      name: "봉피양",
      distance: 10,
      description: "왕",
    });
    const restaurantList = document.getElementById("restaurantList");
    const result = `봉피양`;
    expect(restaurantList).toContainHTML(result);
  });

  test("추가된 Restaurant이 RestaurantList의 배열에 존재하는지 확인한다.", () => {
    document.body.innerHTML = `
      <restaurant-list id="restaurantList"></restaurant-list>
    `;
    addRestaurant({
      category: "중식",
      name: "봉피양",
      distance: 10,
      description: "왕",
    });
    const restaurantList = document.getElementById("restaurantList");
    const result = `봉피양`;
    expect(restaurantList.listState.restaurants.map((r) => r.name)).toContain(result);
  });
});


