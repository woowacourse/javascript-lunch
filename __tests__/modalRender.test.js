/**
 * @jest-environment jsdom
 */

import { screen, fireEvent } from "@testing-library/dom";
import "@testing-library/jest-dom";
import Modal from "../src/component/common/Modal";

document.body.innerHTML = `
<button type="button" class="gnb__button" aria-label="음식점 추가"></button>
`;

const modal = Modal.create();
const modalBg = modal.querySelector(".modal-backdrop");
const modalContainer = modal.querySelector(".modal-container");
document.body.appendChild(modal);

test("모달창 열기 테스트", () => {
  Modal.open(modal);
  expect(modal.classList.contains("modal--open")).toBe(true);
});

test("모달창 닫기 테스트", () => {
  Modal.close(modal);
  expect(modal.classList.contains("modal--open")).toBe(false);
});

test("추가하기 버튼 클릭 이벤트 테스트", () => {
  const addButton = screen.getByLabelText("음식점 추가");

  addButton.addEventListener("click", () => {
    Modal.open(modal);
  });

  fireEvent(
    addButton,
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    }),
  );

  expect(modal.classList.contains("modal--open")).toBe(true);
});

test("Esc로 모달 닫기 테스트", () => {
  document.addEventListener("keyup", (event) => {
    if (event.key === "Escape") Modal.close(modal);
  });

  fireEvent(
    document,
    new KeyboardEvent("keyup", {
      key: "Escape",
    }),
  );

  expect(modal.classList.contains("modal--open")).toBe(false);
});

test("모달 배경 클릭해서 닫기 테스트", () => {
  modalBg.addEventListener("click", () => {
    Modal.close(modal);
  });

  fireEvent(
    modalBg,
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    }),
  );

  expect(modal.classList.contains("modal--open")).toBe(false);
});

test("모달 컨테이너를 클릭하면 모달이 닫히지 않는 테스트", () => {
  Modal.open(modal);

  fireEvent(
    modalContainer,
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    }),
  );

  expect(modal.classList.contains("modal--open")).toBe(true);
});
