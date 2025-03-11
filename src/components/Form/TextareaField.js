import { TEXTAREA } from "../constants/common.js";

function TextareaField({ name }) {
  const textareaElement = document.createElement("textarea");

  textareaElement.name = name;
  textareaElement.id = name;
  textareaElement.cols = TEXTAREA.COLS;
  textareaElement.rows = TEXTAREA.ROWS;

  return textareaElement;
}

export default TextareaField;
