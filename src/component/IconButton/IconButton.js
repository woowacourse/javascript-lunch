import { DOM } from "../../utils/dom.js";

const IconButton = {
  init(onOpenButtonClick) {
    DOM.$gnbButton.addEventListener("click", onOpenButtonClick);
  },
};

export default IconButton;
