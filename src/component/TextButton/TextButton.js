import { DOM } from "../../utils/dom.js";

const TextButton = {
  init(onOpenButtonClick, dom) {
    dom.addEventListener("click", onOpenButtonClick);
  },
};

export default TextButton;
