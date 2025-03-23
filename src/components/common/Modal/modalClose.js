import { $ } from "../../../utils/dom";

const modalClose = (selector) => {
  $(selector).classList.remove("open");
};

export default modalClose;
