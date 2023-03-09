import { $ } from '../../../utils';
import Modal from '../../Modal';
import './index.css';

class RestaurantDetails extends HTMLElement {
  connectedCallback() {
    this.render();
    this.modalHandler();
  }

  render() {
    this.innerHTML = `
      <div class="modal-container">
        <div class="button-container">
            <lunch-button type="click" name="삭제하기" id="deleteContent" color="white"></lunch-button>
            <lunch-button type="click" name="닫기" id="cancelModal" color="orange"></lunch-button>
        </div>
      </div>
    `;
  }

  modalHandler() {
    $('#cancelModal').addEventListener('click', this.closeModal);
  }

  closeModal() {
    new Modal().closeModal();
  }
}

export default RestaurantDetails;
