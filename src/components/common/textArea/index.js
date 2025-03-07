const TextArea = (name, required = false) => {
  const textArea = document.createElement("textarea");

  textArea.setAttribute("type", "text");
  textArea.setAttribute("name", name);
  textArea.setAttribute("id", name);
  textArea.toggleAttribute("required", required);

  return textArea;
};

export default TextArea;
