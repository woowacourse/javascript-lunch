import { TEXTAREA } from "../constants/common.js";

function TextareaField({ name, required = false }) {
  const textareaElement = document.createElement("textarea");

  textareaElement.name = name;
  textareaElement.id = name;
  textareaElement.cols = TEXTAREA.COLS;
  textareaElement.rows = TEXTAREA.ROWS;
  textareaElement.required = required;

  return textareaElement;
}

export default TextareaField;
