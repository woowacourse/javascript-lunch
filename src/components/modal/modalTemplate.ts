import ModalBase from "../common/modal/modal";

const modalContentTemplate = /*html*/ `
<h2 class="modal-title text-title">새로운 음식점</h2>
<form id="modal-form" class="modal-form"></form>
`;

const modalTemplate = /*html*/ `
${ModalBase(modalContentTemplate)}
`;

export default modalTemplate;
