/**
 * @jest-environment jsdom
 */
import { screen, fireEvent } from "@testing-library/dom";
import "@testing-library/jest-dom";
import App from "../src/App";
import Modal from "../src/components/Modal";

test("로컬스토리지에 담긴 음식점 데이터가 화면에 잘 뜨는지 테스트", () => {
  //given
  document.body.innerHTML = `<main></main>`;
  const $main = document.querySelector("main");

  //when
  localStorage.setItem(
    "list",
    JSON.stringify([{ name: "정식당", distance: 5, category: "한식", description: "", link: "" }])
  );
  const app = new App($main);

  //then
  expect(screen.getByText("정식당")).toBeInTheDocument();
});
