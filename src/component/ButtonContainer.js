import TextButton from "./TextButton.js";
import Modal from "./Modal.js";
import append from "../utils/append.js";
import toElement from "../utils/toElement.js";

function ButtonContainer(left, right) {
  const $buttonContainer = toElement(`<div class="button-container" />`);

  left.classList.add("button--secondary");
  right.classList.add("button--primary");

  append($buttonContainer, left, right);

  return $buttonContainer;
}

export default ButtonContainer;
