import { DOM } from "../../utils/dom.js";

const IconButton = {
  init(onOpenButtonClick, dom) {
    dom.addEventListener("click", onOpenButtonClick);
  },
};

export default IconButton;
