import Component from '../core/Component';
import Modal from './Modal';
import Button from './Button.js';

class DetailModal extends Component {
  onRender() {
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
    const $deleteButton = this.element.querySelector('#modal-delete');
    const $cancelButton = this.element.querySelector('#modal-cancel');
    const $backdrop = this.element.querySelector('.modal-backdrop');

    if ($deleteButton) {
      $deleteButton.addEventListener('click', () => {
        if (this.props.onDelete) {
          this.props.onDelete();
        }
        $modal.classList.add('hidden');
      });
    }

    if ($cancelButton) {
      $cancelButton.addEventListener('click', () => {
        $modal.classList.add('hidden');
      });
    }

    if ($backdrop) {
      $backdrop.addEventListener('click', () => {
        $modal.classList.add('hidden');
      });
    }

    const $modalFavorite = this.element.querySelector('.restaurant__favorite');
    if ($modalFavorite) {
      $modalFavorite.addEventListener('click', (event) => {
        const restaurantData = this.props.restaurantData;
        if (!restaurantData) return;

        if (restaurantData.favorite === true) {
          restaurantData.favorite = false;
          if (this.props.removeFavorite) {
            this.props.removeFavorite(restaurantData.id);
          }
        } else {
          restaurantData.favorite = true;
          if (this.props.addFavorite) {
            this.props.addFavorite(restaurantData.id);
          }
        }
      });
    }
  }
}

export default DetailModal;
