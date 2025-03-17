import Component from '../core/Component';
import Modal from './Modal';

class DetailModal extends Component {
  onRender() {
    const detailModal = new Modal({
      content: this.props.content,
    });
    this.element.appendChild(detailModal.element);

    const $modal = this.element.querySelector('.modal');

    document.addEventListener('click', function (event) {
      if (event.target.closest('.modal-backdrop')) $modal.classList.add('hidden');
    });

    document.addEventListener('click', function (event) {
      if (event.target.closest('#modal-cancel')) $modal.classList.add('hidden');
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') $modal.classList.add('hidden');
    });
  }
}

export default DetailModal;
