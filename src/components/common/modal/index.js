import { createElement } from "../../../utils/createElement";
import { modalCloseAndFilter } from "./handleCloseModal";

const Modal = (filter) => {
  const backDrop = createElement(/*html*/ `
    <div class="modal-backdrop"></div>
  `);

  backDrop.addEventListener("click", () => modalCloseAndFilter(filter));
  return backDrop;
};

export default Modal;
