import { DOM } from "../../utils/dom.js";

const IconButton = {
  init(props, dom) {
    const IconButtonElement = createIconButton(props);
    dom.append(IconButtonElement);
  },
};

function createIconButton({ src, onClick, label }) {
  const IconButton = document.createElement("button");
  IconButton.setAttribute("type", "button");
  IconButton.setAttribute("class", "gnb__button");
  IconButton.setAttribute("aria-label", label);
  IconButton.addEventListener("click", onClick);
  IconButton.innerHTML = `<img src=${src} alt=${label} />`;

  return IconButton;
}

export default IconButton;
