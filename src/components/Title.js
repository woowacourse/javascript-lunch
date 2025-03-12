function Title({ type = "default", text }) {
  const h2Element = document.createElement("h2");
  h2Element.classList.add("text-title");
  if (type === "modal") h2Element.classList.add("modal-title");
  h2Element.innerText = text;

  return h2Element;
}

export default Title;
