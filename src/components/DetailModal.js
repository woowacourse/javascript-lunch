import Component from '../core/Component';
import Modal from './Modal';
import Button from './Button.js';

class DetailModal extends Component {
  onRender() {
    const $restaurant = this.element.querySelector('.restaurant');
    const deleteButton = new Button({
      type: 'submit',
      class: 'button--secondary',
      id: 'modal-delete',
      message: '삭제하기',
    });

    const cancelButton = new Button({
      type: 'button',
      class: 'button--primary',
      id: 'modal-cancel',
      message: '닫기',
    });

    const detailModal = new Modal({
      content: `
        ${this.props.content}
        <a href="${this.props.link}" target="_blank">${this.props.link}</a>
        <div class="button-container">
          ${deleteButton.template()}
          ${cancelButton.template()}
        </div>

      `,
    });
    this.element.appendChild(detailModal.element);

    const $modal = this.element.querySelector('.modal');

    document.addEventListener('click', (event) => {
      if (event.target.closest('#modal-delete')) {
        if (this.props.onDelete) {
          this.props.onDelete();
        }
        $modal.classList.add('hidden');
      }
    });
  }
}

export default DetailModal;
