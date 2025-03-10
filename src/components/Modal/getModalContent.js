import { categoryValue, distanceValue } from "../../constants/optionValue.js";
import Dropdown from "../Dropdown/Dropdown.js";
import Input from "../Input/Input.js";

const getModalContent = (type) => {
  if (type === "restaurant") {
    return ` <h2 class="modal-title text-title">새로운 음식점</h2>
        <form id='input-form'>
          ${Dropdown({ id: "category", required: "required", optionValue: categoryValue })}
          ${Input({ id: "name", required: "required", type: "text" })}
          ${Dropdown({ id: "distance", required: "required", optionValue: distanceValue })}
          ${Input({ id: "description", required: "", type: "text" })}
          ${Input({ id: "link", required: "", type: "url" })}
          <div class="button-container">
            <button type="button" class="button button--secondary text-caption">취소하기</button>
            <button class="button button--primary text-caption">추가하기</button>
          </div>
        </form>`;
  }
};

export default getModalContent;
