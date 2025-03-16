import { getHTML } from "../../utils/utils.ts";
import { Button } from "../common/Button.js";
import { StoreAddForm } from "../common/StoreAddForm.js";
import { FormButtons } from "../common/FormButtons.js";
import { InputBox } from "../common/InputBox.js";
import { SelectBox } from "../common/SelectBox.js";
import { TextareaBox } from "../common/TextareaBox.js";
import { StoreDeleteForm } from "../common/StoreDeleteForm.js";

export function openModal(formName, target) {
  getHTML("modalBackground").classList.add("show");

  function template() {
    const templates = {
      storeAdd: () =>
        StoreAddForm({
          id: "restaurantForm",
          formName,
          label: "새로운 음식점",
        }),

      storeDelete: () => StoreDeleteForm(Number(target?.dataset.index)),
    };

    const modalHTML = `
    <div class="modal modal--open">
      <div class="modal-container">
        ${templates[formName] ? templates[formName]() : ""}
      </div>
    </div>`;

    return modalHTML;
  }

  function render() {
    const modalHTML = template();
    getHTML("modalLayout").innerHTML = "";
    getHTML("modalLayout").innerHTML = modalHTML;
  }

  render();

  return { render };
}
