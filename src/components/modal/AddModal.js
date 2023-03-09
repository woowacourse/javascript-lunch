import Modal from './Modal';
import { validateBlankString } from '../../utils/common';
import { $ } from '../../utils/common';

class AddModal extends Modal {
  constructor($target) {
    super($target);
    this.render();
  }

  template() {
    return `
      <h2 class="modal-title text-title">새로운 음식점</h2>
      <form>
        <div class="form-item form-item--required">
          <label for="category text-caption">카테고리</label>
          <select name="category" id="category" required>
            <option value="">선택해 주세요</option>
            <option value="한식">한식</option>
            <option value="중식">중식</option>
            <option value="일식">일식</option>
            <option value="양식">양식</option>
            <option value="아시안">아시안</option>
            <option value="기타">기타</option>
          </select>
        </div>
        <div class="form-item form-item--required">
          <label for="name text-caption">이름</label>
          <input type="text" name="name" id="name" required>
          <span class="error">입력에 공백만 있습니다.</span>
        </div>
        <div class="form-item form-item--required">
          <label for="distance text-caption">거리(도보 이동 시간) </label>
          <select name="distance" id="distance" required>
            <option value="">선택해 주세요</option>
            <option value="5">5분 내</option>
            <option value="10">10분 내</option>
            <option value="15">15분 내</option>
            <option value="20">20분 내</option>
            <option value="30">30분 내</option>
          </select>
        </div>
        <div class="form-item">
          <label for="description text-caption">설명</label>
          <textarea name="description" id="description" cols="30" rows="5"></textarea>
          <span class="help-text text-caption">메뉴 등 추가 정보를 입력해 주세요.</span>
        </div>
        <div class="form-item">
          <label for="link text-caption">참고 링크</label>
          <input type="text" name="link" id="link">
          <span class="help-text text-caption">매장 정보를 확인할 수 있는 링크를 입력해 주세요.</span>
        </div>
        <div class="button-container">
          <button type="button" class="button button--secondary text-caption">취소하기</button>
          <button class="button button--primary text-caption">추가하기</button>
        </div>
      </form>
    `;
  }

  toggleModalOpen() {
    const modal = $('.modal');

    modal.classList.toggle('modal--open');
  }

  render() {
    this.container.insertAdjacentHTML('beforeend', this.template());

    this.toggleModalOpen();
  }

  setSubmitEvent(setStateCallback, addCallback) {
    const modalForm = $('.modal form');

    modalForm.addEventListener('submit', e => {
      if (!validateBlankString($('#name').value)) {
        return this.showError(e);
      }

      $('.error').classList.remove('error--show');
      this.changeRestaurantsState(this.makeNewRestaurant(), setStateCallback, addCallback);
    });
  }

  showError(e) {
    $('.error').classList.add('error--show');

    e.preventDefault();
  }

  changeRestaurantsState(restaurant, setStateCallback, addCallback) {
    setStateCallback(addCallback(restaurant));

    this.toggleModalOpen();
  }

  makeNewRestaurant() {
    const category = $('#category').value;
    const name = $('#name').value;
    const distance = $('#distance').value;
    const description = $('#description').value;
    const link = $('#link').value;

    return { category, name, distance, description, link };
  }

  setModalCloseEvent() {
    const cancelButton = $('.modal .button--secondary');

    cancelButton.addEventListener('click', this.toggleModalOpen);
  }
}

export default AddModal;
