import { getHTML } from "../utils/utils.js";
import { Button } from "./common/Button.js";
import { FormBox } from "./common/FormBox.js";
import { FormButtons } from "./common/FormButtons.js";
import { InputBox } from "./common/InputBox.js";
import { SelectBox } from "./common/SelectBox.js";
import { TextareaBox } from "./common/TextareaBox.js";

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
