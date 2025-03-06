import { DOM } from "../../utils/dom.js";

const TextButton = {
  render(props, dom) {
    const TextButtonElement = createTextButtonElement(props);
    dom.append(TextButtonElement);
  },
};

function createTextButtonElement({ title, onClick, id }) {
  const TextButtonElement = document.createElement("button");
  TextButtonElement.setAttribute("id", id);
  TextButtonElement.setAttribute("class", "button");
  TextButtonElement.classList.add("text-caption");
  if (id === "cancel__button")
    TextButtonElement.classList.add("button--secondary");
  if (id === "add__button") TextButtonElement.classList.add("button--primary");
  TextButtonElement.addEventListener("click", onClick);
  TextButtonElement.innerText = title;

  return TextButtonElement;
}

export default TextButton;
