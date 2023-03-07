import { restaurant } from '../../domain/restaurant';
import { $ } from '../../utils';
import './index.css';

class Modal extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.modalHandler();
    this.addRestaurantEvent();
  }

  render() {
    this.innerHTML = `
    <div class="modal">
      <div id="modalBackdrop" class="modal-backdrop"></div>
      <div class="modal-container">
        <h2 class="modal-title text-title">새로운 음식점</h2>
        <form>
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
        </form>
      </div>
    </div>
    `;
  }

  addRestaurantEvent() {
    $('#addRestaurant').addEventListener('click', (e) => {
      e.preventDefault();

      const categoryValue = $('#categoryList').value;
      const nameValue = $('#nameInput').value;
      const distanceValue = $('#distanceList').value;
      const descriptionValue = $('#descriptionInput').value;
      const linkValue = $('#linkInput').value;

      restaurant.addRestaurant({
        category: categoryValue,
        name: nameValue,
        distance: distanceValue,
        description: descriptionValue,
        link: linkValue,
      });
      this.resetValue();
      this.toggleModal();
    });
  }

  resetValue() {
    $('#categoryList').value = '';
    $('#nameInput').value = '';
    $('#distanceList').value = '';
    $('#descriptionInput').value = '';
    $('#linkInput').value = '';
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
