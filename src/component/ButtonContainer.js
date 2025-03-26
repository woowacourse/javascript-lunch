import TextButton from "./TextButton.js";
import Modal from "./Modal.js";
import append from "../utils/append.js";
import toElement from "../utils/toElement.js";

function ButtonContainer(left, right) {
  const $el = toElement(`<div class="button-container" />`);

  left.classList.add("button--secondary");
  right.classList.add("button--primary");

  append($el, left, right);

  return $el;
}

export default ButtonContainer;
