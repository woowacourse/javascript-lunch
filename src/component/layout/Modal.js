import { SELECT_OPTIONS } from "../../constants/constants.js";
import { modalClose } from "../../util/modalAction.js";
import { Button } from "../button/Button.js";

export function Modal({ modalContent }) {
  const container = document.createElement("div");
  container.classList.add("modal");
  container.innerHTML = `
      <div class="modal-backdrop"></div>
      <div class="modal-container">
        <h2 class="modal-title text-title">새로운 음식점</h2>
      </div>
`;
  document.querySelector("body").appendChild(container);
  document.querySelector(".modal-container").appendChild(modalContent);
  document.querySelector(".modal-backdrop").addEventListener("click", () => {
    modalClose();
  });

  return;
}
