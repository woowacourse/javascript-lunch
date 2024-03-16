import { INFO_MESSAGE } from '@/constants/Message';
import BaseComponent from '../BaseComponent';
import BasicButton from '../BasicButton/BasicButton';
import { $ } from '@/utils/DOM';
import RestaurantUpdateService from '@/domains/services/RestaurantUpdateService';
import BasicModal from '../BasicModal/BasicModal';

class AlertModal extends BaseComponent {
  #restaurantUpdateService;

  constructor() {
    super();
    this.#restaurantUpdateService = new RestaurantUpdateService();
  }

  render() {
    const $modalBox = document.createElement('div');

    const $modalContent = document.createElement('div');
    $modalBox.append($modalContent);
    $modalBox.textContent = INFO_MESSAGE.DELETE_CONFIRM;

    const buttons = this.#makeButtons();
    $modalBox.append(buttons);

    this.append(new BasicModal($modalBox, 'center'));
  }

  #makeButtons() {
    const $buttonBox = document.createElement('div');
    $buttonBox.classList.add('button-container');

    const $deleteButton = this.#makeDeleteButton();
    const $cancelButton = this.#makeCancelButton();

    $buttonBox.append($deleteButton);
    $buttonBox.append($cancelButton);
    $buttonBox.classList.add('delete-button-box');
    return $buttonBox;
  }

  #makeDeleteButton() {
    return new BasicButton({
      variant: 'secondary',
      textContent: '삭제하기',
      type: 'button',
      clickEvent: () => {
        const targetId = $('.restaurant-detail').id;
        this.#restaurantUpdateService.deleteRestaurant(Number(targetId));
        $('#detail-modal').classList.remove('modal--open');
        $('#alert-modal').classList.add('hidden');
      },
    });
  }

  #makeCancelButton() {
    return new BasicButton({
      variant: 'primary',
      textContent: '취소하기',
      type: 'button',
      clickEvent: () => $('#alert-modal').classList.add('hidden'),
    });
  }
}

export default AlertModal;

customElements.define('alert-modal', AlertModal);
