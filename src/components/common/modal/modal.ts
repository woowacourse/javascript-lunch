/* eslint-disable max-lines-per-function */
const ModalBase = (
  text: string,
  modalClassName?: string,
  backDropClassName?: string,
  ContainerClassName?: string,
) => /*html*/ `
<div class="modal ${modalClassName}">
  <div class="modal-backdrop ${backDropClassName}"></div>
  <div class="modal-container ${ContainerClassName}">
    ${text}
  </div>
</div>
`;
export default ModalBase;
