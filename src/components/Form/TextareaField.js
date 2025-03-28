const TEXTAREA = {
  COLS: 30,
  ROWS: 10,
};

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
