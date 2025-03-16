import { getStorage } from "../../utils/storage.js";
import { StoreInfo } from "../StoreInfo.js";
import { Button } from "./Button.js";
import { FormButtons } from "./FormButtons.js";
import { InputBox } from "./InputBox.js";
import { SelectBox } from "./SelectBox.js";
import { TextareaBox } from "./TextareaBox.js";

export function StoreDeleteForm(lunchItemIndex) {
  const lunchItem = getStorage("lunchItems")[lunchItemIndex];

  function template() {
    return `
        <form id="storeDeleteForm" class="modal-form">
          ${StoreInfo({ ...lunchItem, type: "full", index: lunchItemIndex })}
          ${FormButtons("storeDelete", lunchItemIndex)}
        </form>
    `;
  }

  return template();
}
