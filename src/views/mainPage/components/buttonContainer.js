import { restaurants } from "../../../constants/restaurantData.js";
import restaurantList from "./restaurantList.js";
import { $ } from "../../../utils/domHelpers.js";
import button from "../../../components/@common/button.js";
import buttonHandler from "../../../eventHandler/button.js";

const buttonContainer = () => {
  const $buttonContainer = $(".button-container");
  $buttonContainer.innerHTML = `
      ${button({
        type: "button",
        id: "cancel-button",
        className: "secondary",
        children: "취소하기",
      })}
      ${button({
        type: "button",
        id: "add-button",
        className: "primary",
        children: "추가하기",
      })}
    
  `;

  const $addButton = $("#add-button");
  const $cancelButton = $("#cancel-button");

  $addButton.addEventListener("click", buttonHandler);
};

export default buttonContainer;
