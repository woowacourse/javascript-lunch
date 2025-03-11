import { Button } from "./Button.js";

export function FormButtons({ formName }) {
  const storeAddBtns = `${Button({ id: "closeModalBtn", type: "button", content: "취소하기", dataSet: "removeModal" })}
                ${Button({ type: "submit", content: "추가하기", styleType: "primary" })}`;

  const storeDeleteBtns = `${Button({ id: "closeModalBtn", type: "submit", content: "삭제하기", dataSet: "removeModal" })}
              ${Button({ type: "button", content: "닫기", styleType: "primary" })}`;

  function template() {
    return `
    <div id="buttonContainer" class="button-container" >
        ${(formName === "addStore" && storeAddBtns) || ""}
        ${(formName === "deleteStore" && storeDeleteBtns) || ""}
    </div>
      `;
  }

  return template();
}
