import Modal from './common/Modal';
import AddForm from './AddForm';

const AddModal = () => {
  const modalTitle = document.createElement('h2');
  modalTitle.classList.add('modal-title', 'text-title');
  modalTitle.textContent = '새로운 음식점';

  const form = AddForm().create();

  const modalComponent = Modal({
    modalClass: 'modal',
    modalContainerClass: 'modal-container',
    children: [modalTitle, form]
  }).create();

  const create = () => modalComponent;

  return {
    create
  };
};

export default AddModal;
