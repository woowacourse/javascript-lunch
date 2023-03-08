import { $ } from '../utils/domSelectors';

class Modal {
  // private content;

  constructor() {
    // modal 안에 보여줄 내용
    // this.content = content;
  }

  closeModal() {
    // 안에 폼이 있을 경우에는 폼 초기화!

    const modal = $('.modal') as HTMLDialogElement;
    modal.close();
  }

  openModal() {
    const modal = $('.modal') as HTMLDialogElement;
    modal.showModal();
  }

  addEvent() {
    const backdrop = $('.modal') as HTMLDialogElement;

    backdrop.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLDialogElement;

      if (target === event.currentTarget) {
        this.closeModal();
      }
    });
  }

  create() {
    return `
      <dialog class="modal">
        <div class="modal-container">
        </div>
      </dialog>
    `;
  }
}

export default Modal;
