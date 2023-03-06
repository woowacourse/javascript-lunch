import { $ } from '../../utils';
import './index.css';

class Modal extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.modalHandler();
  }

  render() {
    this.innerHTML = `
    <div class="modal">
      <div id="modalBackdrop" class="modal-backdrop"></div>
      <div class="modal-container">
        <h2 class="modal-title text-title">새로운 음식점</h2>
        <select-list
        name="카테고리"
        id="category"
        options="한식,중식,일식,양식,아시안,기타">
        </select-list>
        <text-input name ="이름" id="name"></text-input>
        <select-list
        name="거리(도보 이동 시간)"
        id="distance"
        options="5,10,15,20,30">
        </select-list>
        <text-input name ="설명" id="description"></text-input>
        <text-input name ="링크" id="link"></text-input>
        <div class="button-container">
          <lunch-button name="취소하기" id="cancelModal" color="white"></lunch-button>
          <lunch-button name="추가하기" id="addRestaurant" color="orange"></lunch-button>
        </div>
      </div>
    </div>
    `;
  }

  modalHandler() {
    $('#cancelModal').addEventListener('click', this.toggleModal);
    $('#modalBackdrop').addEventListener('click', this.toggleModal);
  }

  toggleModal() {
    $('.modal').classList.toggle('modal--open');
  }
}

export default Modal;
