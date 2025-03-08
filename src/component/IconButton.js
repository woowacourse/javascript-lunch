import { DOM } from "../utils/dom.js";

const IconButton = {
  create({ src, onClick, label }) {
    const IconButtonElement = document.createElement("button");
    IconButtonElement.setAttribute("type", "button");
    IconButtonElement.setAttribute("class", "gnb__button");
    IconButtonElement.setAttribute("aria-label", label);
    IconButtonElement.addEventListener("click", onClick);
    IconButtonElement.innerHTML = `<img src=${src} alt=${label} />`;

    return IconButtonElement;
  },
};

export default IconButton;
