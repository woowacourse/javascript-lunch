import RestaurantDetailModal from '../components/RestaurantDetailModal.js';
import RestaurantEnrollModal from '../components/RestaurantEnrollModal.js';
import { MODAL_TYPE } from '../constants/SETTING.js';

class ModalService {
  #enrollModal = null;
  #detailModal = null;

  constructor(onAddRestaurant) {
    this.#enrollModal = new RestaurantEnrollModal(onAddRestaurant);
    this.#detailModal = new RestaurantDetailModal();
  }

  appendModal() {
    const $main = document.getElementsByTagName('main')[0];
    $main.append(this.#enrollModal.modal.getElement(), this.#detailModal.modal.getElement());
  }

  toggleModal(type) {
    if (type === MODAL_TYPE.DETAIL) {
      this.#detailModal.modal.toggle();
    } else if (type === MODAL_TYPE.ENROLL) {
      this.#enrollModal.modal.toggle();
    }
  }

  updateModalContent({ data, onClickStar, onDelete }) {
    this.#detailModal.updateModalContent({
      data,
      onClickStar,
      onDelete,
    });
  }
}

export default ModalService;
