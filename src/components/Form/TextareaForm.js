function TextareaForm(name) {
  const textareaElement = document.createElement("textarea");

  textareaElement.name = name;
  textareaElement.id = name;
  textareaElement.cols = 30;
  textareaElement.rows = 5;

  return textareaElement;
}

export default TextareaForm;
