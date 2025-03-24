import { createElement } from "../../../utils/createElement";
import { modalCloseAndFilter } from "./handleCloseModal";

const Modal = ({ renderRestaurants }) => {
  const backDrop = createElement(/*html*/ `
    <div class="modal-backdrop"></div>
  `);

  backDrop.addEventListener("click", () =>
    modalCloseAndFilter(renderRestaurants)
  );
  return backDrop;
};

export default Modal;
