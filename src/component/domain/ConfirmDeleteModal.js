import Modal from "../common/Modal";

const TEMPLATE = `
<h1></h1>
<h3>정말로 삭제하실 건가요?</h3>
<div class="button-container">
  <button type="button" id="delete-no" class="button button--secondary text-caption">
    아니오
  </button>
  <button type="button" id="delete-yes" class="button button--primary text-caption">
    네
  </button>
</div>
`;

const ConfirmDeleteModal = {
  create() {
    const confirmDeleteModal = Modal.create("confirm-delete-modal");

    Modal.setInnerHTML(confirmDeleteModal, TEMPLATE);

    return confirmDeleteModal;
  },
};

export default ConfirmDeleteModal;
