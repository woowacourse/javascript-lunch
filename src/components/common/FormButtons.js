import { ClickActions } from "../../constants/Events.js";
import { Button } from "./Button.js";

export function FormButtons(formName) {
  const storeAddBtns = `${Button({
    id: "closeModalBtn",
    type: "button",
    content: "취소하기",
    dataSet: ClickActions.REMOVE_MODAL,
  })}

  ${Button({
    type: "submit",
    content: "추가하기",
    styleType: "primary",
  })}`;

  const storeDeleteBtns = `${Button({
    id: "storeDeleteBtn",
    type: "submit",
    content: "삭제하기",
    dataSet: ClickActions.REMOVE_MODAL,
  })}

  ${Button({
    type: "button",
    id: "closeModalBtn",
    content: "닫기",
    styleType: "primary",
    dataSet: ClickActions.REMOVE_MODAL,
  })}`;

  function template() {
    return `
    <div id="buttonContainer" class="button-container" >
        ${(formName === "storeAdd" && storeAddBtns) || ""}
        ${(formName === "storeDelete" && storeDeleteBtns) || ""}
    </div>
      `;
  }

  return template();
}
