import { $, $$ } from '../util/querySelector';
import { Restaurant } from '../type';
import getFormData from '../util/getFormData';

type RestaurantAddModalType = {
  parentElement: HTMLElement;
  parentEvent: {
    onModalCancelButtonClicked: () => void;
    onModalAddButtonClicked: (restaurantData: Restaurant) => void;
  };
};

class RestaurantAddModal {
  #parentElement;
  #parentEvent;

  constructor({ parentElement, parentEvent }: RestaurantAddModalType) {
    this.#parentElement = parentElement;
    this.#parentEvent = parentEvent;

    this.#render();
    this.#setListeners();
  }

  toggleModal() {
    $(`#restaurant-add-modal`).classList.toggle('modal--open');
  }

  clearAllInputs() {
    $$(
      '#modal-add-form input, #modal-add-form textarea, #modal-add-form select'
    ).forEach((input) => {
      if (
        input instanceof HTMLInputElement ||
        input instanceof HTMLTextAreaElement ||
        input instanceof HTMLSelectElement
      ) {
        input.value = '';
      }
    });
  }

  #setListeners() {
    const $modalCancelButton = $(`#modal-cancel-button`);
    const $modalAddForm = $(`#modal-add-form`);

    $modalCancelButton.addEventListener('click', () => {
      this.#parentEvent.onModalCancelButtonClicked();
    });

    $modalAddForm.addEventListener('submit', (event) => {
      event.preventDefault();

      if ($modalAddForm instanceof HTMLFormElement) {
        const restaurantData = getFormData($modalAddForm);

        this.#parentEvent.onModalAddButtonClicked(restaurantData as Restaurant);
      }
    });
  }

  #render() {
    const template = `
      <div class="modal" id="restaurant-add-modal">
      <div class="modal-backdrop"></div>
      <div class="modal-container">
        <h2 class="modal-title text-title">새로운 음식점</h2>
        <form id="modal-add-form">
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
            <label for="name">이름</label>
            <input type="text" name="name" id="name" required>
          </div>
          <div class="form-item form-item--required">
            <label for="distance">거리(도보 이동 시간) </label>
            <select name="distanceInMinutes" id="distance" required>
              <option value="">선택해 주세요</option>
              <option value="5">5분 내</option>
              <option value="10">10분 내</option>
              <option value="15">15분 내</option>
              <option value="20">20분 내</option>
              <option value="30">30분 내</option>
            </select>
          </div>
          <div class="form-item">
            <label for="description">설명</label>
            <textarea name="description" id="description" cols="30" rows="5"></textarea>
            <span class="help-text text-caption">메뉴 등 추가 정보를 입력해 주세요.</span>
          </div>
          <div class="form-item">
            <label for="link">참고 링크</label>
            <input type="text" name="link" id="link">
            <span class="help-text text-caption">매장 정보를 확인할 수 있는 링크를 입력해 주세요.</span>
          </div>
          <div class="button-container">
            <button type="button" class="button button--secondary text-caption" id="modal-cancel-button">취소하기</button>
            <button class="button button--primary text-caption" id="modal-add-button">추가하기</button>
          </div>
        </form>
      </div>
    </div>`;

    this.#parentElement.innerHTML = template;
  }
}

export default RestaurantAddModal;
