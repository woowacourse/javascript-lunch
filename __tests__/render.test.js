import { screen, fireEvent } from "@testing-library/dom";
import "@testing-library/jest-dom";
import HeaderComponent from "../src/components/HeaderComponent";
import ModalComponent from "../src/components/modal/ModalComponent";
import RestaurantAddFormComponent from "../src/components/modal/RestaurantAddFormComponent";

/**
 * @jest-environment jsdom
 */

describe("모달 렌더링 테스트", () => {
  //given
  const header = new HeaderComponent();
  const modal = new ModalComponent();
  const form = new RestaurantAddFormComponent();
  document.body.innerHTML = `
      <header-element></header-element>
      <modal-element></modal-element>
  `;

  test("음식점 추가 버튼 클릭하면 모달 창이 열린다.", () => {
    // when
    fireEvent.click(screen.getByLabelText("음식점 추가"));

    // then
    expect(
      document.querySelector(".modal").classList.contains("modal--open")
    ).toBeTruthy();
  });

  test("취소하기 버튼 클릭하면 모달 창이 닫힌다.", () => {
    //when
    fireEvent.click(screen.getByText("취소하기"));

    //then
    expect(
      document.querySelector(".modal").classList.contains("modal--open")
    ).toBeFalsy();
  });
});
