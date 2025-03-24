import { restuarantData } from "../../utils/storage.js";
import { StoreInfo } from "../function/StoreInfo.js";
import { Button } from "./Button.js";
import { FormButtons } from "./FormButtons.js";
import { InputBox } from "./InputBox.js";
import { SelectBox } from "./SelectBox.js";
import { TextareaBox } from "./TextareaBox.js";

export function StoreDeleteForm(dataID) {
  const lunchItem = restuarantData.find(dataID);

  function template() {
    return `
        <form id="storeDeleteForm" class="modal-form" data-id="${dataID}">
          ${StoreInfo({ ...lunchItem, type: "full" })}
          ${FormButtons("storeDelete")}
        </form>
    `;
  }

  return template();
}
