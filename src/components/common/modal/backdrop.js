import { createElement } from "../../../utils/createElement";

const BackDrop = (handleCloseModal) => {
  const backDrop = createElement(/*html*/ `
    <div class="modal-backdrop"></div>
  `);

  backDrop.addEventListener("click", handleCloseModal);

  return backDrop;
};

export default BackDrop;
