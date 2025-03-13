import { createElement } from "../../../utils/createElement";

const BackDrop = (id, handleCloseModal) => {
  const backDrop = createElement(/*html*/ `
    <div class="modal-backdrop" id=${id}></div>
  `);

  backDrop.addEventListener("click", handleCloseModal);

  return backDrop;
};

export default BackDrop;
