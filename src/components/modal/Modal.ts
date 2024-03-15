import './modal.css';

interface ModalProps {
  title: string;
  child: HTMLElement;
}

class Modal extends HTMLDivElement {
  constructor(props: ModalProps) {
    super();
    this.className = 'modal';
    this.createLayout(props);    
  }

  createLayout({child, title}: ModalProps) {
    const modalBackdrop = document.createElement('div');
    modalBackdrop.className = 'modal-backdrop';
    this.appendChild(modalBackdrop);

    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal-container';
    
    const modalTitle = document.createElement('h2');
    modalTitle.className = 'modal-title';
    const modalTitleClassList = ['modal-title', 'text-title'];
    modalTitle.textContent = title;
    modalTitle.classList.add(...modalTitleClassList);
    
    modalContainer.appendChild(modalTitle);
    modalContainer.appendChild(child);
    this.appendChild(modalContainer);
  }

  toggleModal() {
    this.classList.toggle('modal--open');
  }
}

customElements.define('matzip-modal', Modal, { extends: 'div' });

export default Modal;
