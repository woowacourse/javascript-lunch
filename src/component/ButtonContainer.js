import TextButton from "./TextButton.js";
import Modal from "./Modal.js";
import append from "../utils/append.js";
import toElement from "../utils/toElement.js";

function ButtonContainer(buttonList) {
  const $buttonContainer = toElement(`<div class="button-container" />`);

  buttonList.forEach((button) => {
    append($buttonContainer, button);
  });

  return $buttonContainer;
}

export default ButtonContainer;
