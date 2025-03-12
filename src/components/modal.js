import { getHTML } from "../utils/utils.js";
import { Button } from "./Button.js";
import { FormBox } from "./FormBox.js";
import { FormButtons } from "./FormButtons.js";
import { InputBox } from "./InputBox.js";
import { SelectBox } from "./SelectBox.js";
import { TextareaBox } from "./TextareaBox.js";

export function openModal() {
  const modalHTML = `<div class="modal modal--open">
    <div class="modal-container">
      ${FormBox({ id: "restaurantForm", formName: "storeAdd", label: "새로운 음식점" })}
    </div>
  </div>`;

  getHTML("modalBackground").innerHTML = "";
  getHTML("modalBackground").innerHTML = modalHTML;
  getHTML("modalBackground").classList.add("show");
}
