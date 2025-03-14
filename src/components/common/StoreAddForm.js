import { getStorage } from "../../utils/storage.js";
import { StoreInfo } from "../StoreInfo.js";
import { Button } from "./Button.js";
import { FormButtons } from "./FormButtons.js";
import { InputBox } from "./InputBox.js";
import { SelectBox } from "./SelectBox.js";
import { TextareaBox } from "./TextareaBox.js";

export function StoreAddForm({ id, label }) {
  function template() {
    return `
        ${
          (label && `<h2 class="modal-title text-title">새로운 음식점</h2>`) ||
          ""
        }
        <form id="${id}" class="modal-form">
          ${storeAddTemplate}
          ${FormButtons("storeAdd")}
        </form>
    `;
  }

  return template();
}

const storeDeleteTemplate = `
  ${StoreInfo(1, "full")}
`;

const storeAddTemplate = `
        ${SelectBox({
          id: "category",
          name: "category",
          label: "카테고리",
          optionName: "category",
          required: true,
        })}

        ${InputBox({
          name: "name",
          id: "name",
          required: true,
          label: "이름",
          placeHolder: "파양콩 할마니",
          maxLength: 15,
          type: "text",
        })}

        ${SelectBox({
          id: "distance",
          name: "distance",
          label: "거리(도보 이동 시간)",
          optionName: "distance",
          required: true,
        })}

        ${TextareaBox({
          id: "description",
          name: "description",
          label: "설명",
          required: false,
          cols: "30",
          rows: "5",
          helpCaption: "메뉴 등 추가 정보를 입력해 주세요.",
        })}

        ${InputBox({
          name: "link",
          id: "link",
          required: false,
          label: "참고 링크",
          placeHolder: "https://",
          maxLength: 30,
          type: "url",
          helpCaption: "매장 정보를 확인할 수 있는 링크를 입력해 주세요.",
        })}
`;
