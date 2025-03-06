import { SELECT_OPTIONS } from "../constants/constants.js";
import { Button } from "./Button.js";
import { Input } from "./Input.js";
import { SelectInput } from "./SelectInput.js";
import { TextareaInput } from "./TextareaInput.js";

export function Modal({ form }) {
  const container = document.createElement("div");
  container.classList.add("modal");
  container.innerHTML = `
      <div class="modal-backdrop"></div>
      <div class="modal-container">
        <h2 class="modal-title text-title">새로운 음식점</h2>
      </div>
`;
  document.querySelector("body").appendChild(container);
  document.querySelector(".modal-container").appendChild(form);

  return;
}
