import { TEXTAREA } from "../constants/common.js";

function TextareaForm(name) {
  const textareaElement = document.createElement("textarea");

  textareaElement.name = name;
  textareaElement.id = name;
  textareaElement.cols = TEXTAREA.COLS;
  textareaElement.rows = TEXTAREA.ROWS;

  return textareaElement;
}

export default TextareaForm;
