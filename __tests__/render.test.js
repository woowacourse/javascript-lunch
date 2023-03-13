import { fireEvent } from "@testing-library/dom";
import "@testing-library/jest-dom";
import HeaderComponent from "../src/components/common/HeaderComponent";
import ModalComponent from "../src/components/modal/ModalComponent";

/**
 * @jest-environment jsdom
 */

describe("모달 렌더링 테스트", () => {
  beforeEach(() => {
    //given
    const header = new HeaderComponent();
    const modal = new ModalComponent();

    document.body.innerHTML = `
      <header-element></header-element>
      <modal-element></modal-element>
    `;
  });

  test("음식점 추가 버튼 클릭하면 모달 창이 열린다.", () => {
    // when
    fireEvent.click(
      document
        .querySelector("header-element")
        .shadowRoot.querySelector("button")
    );

    // then
    expect(
      document
        .querySelector("modal-element")
        .shadowRoot.querySelector(".modal")
        .classList.contains("modal--open")
    ).toBeTruthy();
  });

  test("취소하기 버튼 클릭하면 모달 창이 닫힌다.", () => {
    //given
    fireEvent.click(
      document
        .querySelector("header-element")
        .shadowRoot.querySelector("button")
    );

    //when
    fireEvent.click(
      document
        .querySelector("modal-element")
        .shadowRoot.querySelector("restaurant-add-form")
        .shadowRoot.querySelector(".button--secondary")
    );

    //then
    expect(
      document
        .querySelector("modal-element")
        .shadowRoot.querySelector(".modal")
        .classList.contains("modal--open")
    ).toBeFalsy();
  });
});
