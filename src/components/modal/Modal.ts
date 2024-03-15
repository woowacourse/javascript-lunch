import './modal.css';

interface ModalProps {
  classname: string;
  title?: string;
  child: HTMLElement;
}

class Modal extends HTMLDivElement {
  constructor(props: ModalProps) {
    super();
    this.className = props.classname;
    this.createLayout(props);    
  }

  createLayout({classname, child, title}: ModalProps) {
    const modalBackdrop = document.createElement('div');
    modalBackdrop.className = `${classname}-backdrop`;
    this.appendChild(modalBackdrop);

    const modalContainer = document.createElement('div');
    modalContainer.className = `${classname}-container`;
    
    if (title !== undefined) {
      const modalTitle = document.createElement('h2');
      modalTitle.className = 'modal-title';
      const modalTitleClassList = ['modal-title', 'text-title'];
      modalTitle.textContent = title;
      modalTitle.classList.add(...modalTitleClassList);
      modalContainer.appendChild(modalTitle);
    }
    
    modalContainer.appendChild(child);
    this.appendChild(modalContainer);
  }

  toggleModal(classname: string) {
    this.classList.toggle(`${classname}--open`);
  }
}

customElements.define('matzip-modal', Modal, { extends: 'div' });

export default Modal;
