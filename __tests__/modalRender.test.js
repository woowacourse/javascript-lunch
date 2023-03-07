/**
 * @jest-environment jsdom
 */

import { screen, fireEvent } from "@testing-library/dom";
import "@testing-library/jest-dom";
import Modal from "../src/util/Modal";

document.body.innerHTML = `
<button type="button" class="gnb__button" aria-label="음식점 추가"></button>
<div class="modal" role="modal">
<div class="modal-backdrop" role="modal-bg"></div>
<div class="modal-container" role="modal-container"></div>
</div>`;

const modal = new Modal();
const myModal = screen.getByRole("modal");

test("모달창 열기 테스트", () => {
  modal.open();
  expect(myModal.classList.contains("modal--open")).toBe(true);
});

test("모달창 닫기 테스트", () => {
  modal.close();
  expect(myModal.classList.contains("modal--open")).toBe(false);
});

test("추가하기 버튼 클릭 이벤트 테스트", () => {
  const addButton = screen.getByLabelText("음식점 추가");
  addButton.addEventListener("click", () => {
    modal.open();
  });
  fireEvent(
    addButton,
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    })
  );
  expect(myModal.classList.contains("modal--open")).toBe(true);
});

test("Esc로 모달 닫기 테스트", () => {
  document.addEventListener("keyup", (event) => {
    if (event.key === "Escape") modal.close();
  });

  fireEvent(
    document,
    new KeyboardEvent("keyup", {
      key: "Escape",
    })
  );

  expect(myModal.classList.contains("modal--open")).toBe(false);
});

test("모달 배경 클릭해서 닫기 테스트", () => {
  const modalBg = screen.getByRole("modal-bg");

  modalBg.addEventListener("click", () => {
    modal.close();
  });

  fireEvent(
    modalBg,
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    })
  );

  expect(myModal.classList.contains("modal--open")).toBe(false);
});

test("모달 컨테이너를 클릭하면 모달이 닫히지 않는 테스트", () => {
  modal.open();
  const modalContainer = screen.getByRole("modal-container");

  fireEvent(
    modalContainer,
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    })
  );

  expect(myModal.classList.contains("modal--open")).toBe(true);
});
