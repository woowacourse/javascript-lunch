import { clearInput } from "../../../utils/clearInput";
import { $ } from "../../../utils/dom";

const modalClose = (selector) => {
  $(selector).classList.remove("open");
  // clearInput("#register-form");
};

export default modalClose;
