/**
 * @jest-environment jsdom
 */

import { screen, fireEvent } from "@testing-library/dom";
import "@testing-library/jest-dom";
import Modal from "../src/util/Modal";

document.body.innerHTML = `<div class="modal" role="modal">
<div class="modal-backdrop" ></div>
<div class="modal-container"></div>
</div>`;

const modal = new Modal();

test("모달창 열기 테스트", () => {
    const myModal = screen.getByRole("modal");
    modal.open();
    expect(myModal.classList.contains('modal--open')).toBe(true);
});

test("모달창 닫기 테스트", () => {
    const myModal = screen.getByRole("modal");
    modal.close();
    expect(myModal.classList.contains('modal--open')).toBe(false);
});