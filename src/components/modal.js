import { getHTML } from "../utils/utils.js";
import { Button } from "./Button.js";
import { FormButtons } from "./FormButtons.js";
import { InputBox } from "./InputBox.js";
import { SelectBox } from "./SelectBox.js";

export function openModal() {
  const modalHTML = `<div class="modal modal--open">
    <div class="modal-container">
      <h2 class="modal-title text-title">새로운 음식점</h2>
      <form id="restaurantForm">

        <!-- 카테고리 -->
        ${SelectBox({
          id: "category",
          name: "category",
          label: "카테고리",
          optionName: "category",
          required: true,
        })}

        <!-- 음식점 이름 -->
        ${InputBox({
          name: "name",
          id: "name",
          required: true,
          label: "이름",
          placeHolder: "파양콩 할마니",
          maxLength: 15,
          type: "text",
        })}

        <!-- 거리 -->
        ${SelectBox({
          id: "distance",
          name: "distance",
          label: "거리(도보 이동 시간)",
          optionName: "distance",
          required: true,
        })}

        <!-- 설명 -->
        <div class="form-item">
          <label for="description text-caption">설명</label>
          <textarea name="description" id="description" cols="30" rows="5"></textarea>
          <span class="help-text text-caption">메뉴 등 추가 정보를 입력해 주세요.</span>
        </div>

        <!-- 링크 -->
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

        <!-- 취소/추가 버튼 -->
        ${FormButtons({ formName: "addStore" })}
      </form>
    </div>
  </div>`;
  getHTML("modalBackground").innerHTML = "";
  getHTML("modalBackground").innerHTML = modalHTML;
  getHTML("modalBackground").classList.add("show");
}
