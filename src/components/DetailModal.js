import Component from '../core/Component';
import Modal from './Modal';

class DetailModal extends Component {
  onRender() {
    const detailModal = new Modal({
      content: this.props.content,
    });
    this.element.appendChild(detailModal.element);

    const $modalBackdrop = this.element.querySelector('.modal-backdrop');
    const $modalCancelButton = this.element.querySelector('#modal-cancel');
    const $modal = this.element.querySelector('.modal');

    $modalBackdrop.addEventListener('click', function () {
      // TODO: 배경 클릭시에는 모달이 안꺼짐. 콘솔은 잘 출력되는데 왤까.. hidden 클래스 적용이 안됨..
      console.log('바깥 배경 누를때 가리키는 모달', $modal);
      $modal.classList.add('hidden');
    });

    // TODO: 닫기버튼도 hidden 클래스 적용이 안됨..
    $modalCancelButton.addEventListener('click', function () {
      console.log('닫기버튼 누를때 가리키는 모달', $modal);

      $modal.classList.add('hidden');
    });

    // ESC할 때는 hidden 클래스 잘 적용 됨..
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') $modal.classList.add('hidden');
    });
  }
}

export default DetailModal;
