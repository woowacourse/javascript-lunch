import './modal.css';

interface ModalProps {
  title?: string;
}

class Modal extends HTMLDivElement {
  private modalBackdrop: HTMLDivElement;
  private modalContainer: HTMLDivElement;

  constructor(props: ModalProps) {
    super();
    this.className = 'modal';
    this.modalBackdrop = this.createBackdrop();
    this.modalContainer = this.createModalContainer(props);
    this.listenBackdropClick();
  }

  createBackdrop() {
    const modalBackdrop = document.createElement('div');
    modalBackdrop.className = 'modal-backdrop';
    this.appendChild(modalBackdrop);
    return modalBackdrop;
  }

  createModalContainer({ title }: ModalProps) {
    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal-container';

    if (typeof title !== 'undefined') {
      const modalTitle = document.createElement('h2');
      modalTitle.className = 'modal-title';
      const modalTitleClassList = ['modal-title', 'text-title'];
      modalTitle.textContent = title;
      modalTitle.classList.add(...modalTitleClassList);
      modalContainer.appendChild(modalTitle);
    }

    this.appendChild(modalContainer);
    return modalContainer;
  }

  appendChildNode(child: HTMLElement) {
    this.modalContainer.appendChild(child);
  }

  stopEventBubbling() {
    this.modalContainer.addEventListener('click', (event) => {
      event.stopPropagation();
    });
  }

  listenBackdropClick() {
    this.modalBackdrop.addEventListener('click', () => {
      this.toggleModal();
    });
  }

  toggleModal() {
    this.classList.toggle('modal--open');
  }
}

customElements.define('matzip-modal', Modal, { extends: 'div' });

export default Modal;
