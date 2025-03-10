import { DOM } from "../utils/dom.js";

const TextButton = {
  create({ title, onClick, id }) {
    const TextButtonElement = document.createElement("button");
    TextButtonElement.setAttribute("id", id);
    TextButtonElement.setAttribute("class", "button");
    TextButtonElement.setAttribute("type", "button");
    TextButtonElement.classList.add("text-caption");
    if (id === "cancel__button")
      TextButtonElement.classList.add("button--secondary");
    if (id === "add__button") {
      TextButtonElement.setAttribute("type", "submit");
      TextButtonElement.classList.add("button--primary");
    }
    TextButtonElement.addEventListener("click", onClick);
    TextButtonElement.innerText = title;

    return TextButtonElement;
  },
};

export default TextButton;
