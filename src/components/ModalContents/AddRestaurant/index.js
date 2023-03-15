import { restaurant } from '../../../domain/restaurant';
import { $ } from '../../../utils';
import Modal from '../../Modal';
import './index.css';

class AddRestaurant extends HTMLElement {
  connectedCallback() {
    this.render();
    this.addRestaurantEvent();
    this.handleModal();
  }

  render() {
    this.innerHTML = `
      <div class="modal-container">
        <h2 class="modal-title text-title">새로운 음식점</h2>
        <form id="addRestaurant">
          <div class="overflow">
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
          <span class="help-caption text-caption">메뉴 등 추가 정보를 입력해 주세요.</span>
          <text-input name ="링크" id="link"></text-input>
          <span class="help-caption text-caption">매장 정보를 확인할 수 있는 링크를 입력해 주세요.</span>
          </div>
          <div class="button-container">
            <lunch-button type="click" name="취소하기" id="closeModal" color="white"></lunch-button>
            <lunch-button type="submit" name="추가하기" color="orange"></lunch-button>
          </div>
        </form>
      </div>
    `;
  }

  generateId() {
    return Date.now();
  }

  addRestaurantEvent() {
    $('#addRestaurant').addEventListener('submit', (e) => {
      e.preventDefault();
      const idValue = this.generateId();
      const categoryValue = $('#categoryList').value;
      const nameValue = $('#nameInput').value;
      const distanceValue = $('#distanceList').value;
      const descriptionValue = $('#descriptionInput').value;
      const linkValue = $('#linkInput').value;
      const favoriteDefault = false;

      restaurant.addRestaurant({
        id: idValue,
        category: categoryValue,
        name: nameValue,
        distance: distanceValue,
        description: descriptionValue,
        link: linkValue,
        isFavorite: favoriteDefault,
      });
      this.resetValue();
      this.closeModal();
    });
  }

  resetValue() {
    $('#categoryList').value = '';
    $('#nameInput').value = '';
    $('#distanceList').value = '';
    $('#descriptionInput').value = '';
    $('#linkInput').value = '';
  }

  handleModal() {
    $('#closeModal').addEventListener('click', this.closeModal);
  }

  closeModal() {
    new Modal().closeModal();
  }
}

export default AddRestaurant;
