/**
 * @jest-environment jsdom
 */

import { screen } from "@testing-library/dom";
import "@testing-library/jest-dom";

import { renderRestaurantList } from "../src/component/restaurantList";
import { initialRestaurantData } from "../src/constant/initialRestaurants";

beforeEach(() => {
  document.body.innerHTML = `<section class="restaurant-list-container"></section>`;
});

test("초기 음식점 목록을 렌더링한다.", () => {
  const restaurants = renderRestaurantList(initialRestaurantData);
  document.body.insertAdjacentHTML("beforeend", restaurants);

  expect(screen.queryByText("친친")).toBeInTheDocument();
});
