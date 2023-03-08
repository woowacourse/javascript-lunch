/**
 * @jest-environment jsdom
 */

import { screen, fireEvent } from "@testing-library/dom";
import "@testing-library/jest-dom";
import Header from "../src/UI/Header";
import Modal from "../src/UI/Modal";
import FilterBar from "../src/UI/FilterBar";
import RestaurantContainer from "../src/UI/RestaurantContainer";
import RestaurantRegistry from "../src/UI/RestaurantRegistry";

beforeEach(() => {
  document.body.innerHTML = "";
});

test("헤더바 렌더링 테스트", () => {
  const header = new Header();
  header.render();

  expect(screen.queryByText("점심 뭐 먹지")).toBeInTheDocument();
});

test("모달창 렌더링 테스트", () => {
  const modal = new Modal();
  modal.render();

  expect(screen.queryByText("새로운 음식점")).toBeInTheDocument();
});

test("필터바 렌더링 테스트", () => {
  const filterBar = new FilterBar();
  filterBar.render();

  expect(screen.queryByText("한식")).toBeInTheDocument();
});

test("레스토랑 추가 테스트", () => {
  const filterBar = new FilterBar();
  filterBar.render();

  const restaurantContainer = new RestaurantContainer();
  restaurantContainer.render();

  const restaurantRegistry = new RestaurantRegistry();
  restaurantRegistry.appendRestaurant({
    category: "한식",
    name: "한의식당",
    distance: 15,
    description: "된장찌개 짱 맛있음",
    link: "www.hanjjang.com",
  });

  expect(screen.queryByText("한의식당")).toBeInTheDocument();
});
