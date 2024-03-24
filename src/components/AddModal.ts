import { Modal } from './common';
import AddForm from './AddForm';

const AddModal = () => {
  const createModalTitle = () => {
    const modalTitle = document.createElement('h2');
    modalTitle.classList.add('modal-title', 'text-title');
    modalTitle.textContent = '새로운 음식점';
    return modalTitle;
  };

  const createForm = () => AddForm().create();

  const createModalComponent = () => {
    const modalTitle = createModalTitle();
    const form = createForm();

    const modalComponent = Modal({
      modalClass: 'modal',
      modalContainerClass: 'modal-container',
      children: [modalTitle, form]
    }).create();

    return modalComponent;
  };

  const create = () => createModalComponent();

  return {
    create
  };
};

export default AddModal;
