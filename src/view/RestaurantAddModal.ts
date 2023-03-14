import { $, $$ } from '../util/querySelector';
import { UserRestaurantInput } from '../type';
import Modal from './components/Modal';
import getFormData from '../util/getFormData';
import TwinButtons from './components/TwinButtons';

type RestaurantAddModalType = {
  parentElement: HTMLElement;
  parentEvent: {
    onModalCancelButtonClicked: () => void;
    onModalAddButtonClicked: (restaurantData: UserRestaurantInput) => void;
  };
};

class RestaurantAddModal {
  #parentElement;
  #parentEvent;
  #modal;

  constructor({ parentElement, parentEvent }: RestaurantAddModalType) {
    this.#parentElement = parentElement;
    this.#parentEvent = parentEvent;

    this.#modal = new Modal({
      parentElement: this.#parentElement,
      info: {
        id: 'restaurant-add-modal',
        innerId: 'restaurant-add-modal-contents',
      },
    });

    this.#fillContentsInModal();
    this.#setListeners();
  }

  closeOrOpenModal(command: string) {
    this.#modal.closeOrOpenModal(command);
  }

  showErrorMessage(message: string) {
    $(`#error-item`).style.opacity = '1';
    $(`#error-text`).innerText = message;
  }

  hideErrorMessage() {
    $(`#error-item`).style.opacity = '0';
    $(`#error-text`).innerText = '';
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

  #fillContentsInModal() {
    const template = `
      <h2 class="modal-title text-title">새로운 음식점</h2>
      <form id="modal-add-form">
        <div class="modal-add-main-menu">
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
        </div>
        <div class="error-item" id="error-item">
          <img class="error-image" src="./error-icon.png" />
          <div class="error-text text-caption" id="error-text"></span>
        </div>
      </form>
    `;

    $('#restaurant-add-modal-contents').innerHTML = template;

    new TwinButtons({
      parentElement: $('#modal-add-form'),
      info: {
        leftButtonId: 'add-modal-cancel',
        rightButtonId: 'add-modal-submit',
        leftButtonName: '취소하기',
        rightButtonName: '추가하기',
      },
      parentEvent: {
        onLeftButtonClicked: () =>
          this.#parentEvent.onModalCancelButtonClicked(),
      },
    });
  }

  #setListeners() {
    const $modalAddForm = $(`#modal-add-form`);

    $modalAddForm.addEventListener('submit', (event) => {
      event.preventDefault();

      if ($modalAddForm instanceof HTMLFormElement) {
        const restaurantData = getFormData($modalAddForm);

        this.#parentEvent.onModalAddButtonClicked(
          restaurantData as UserRestaurantInput
        );
      }
    });
  }
}

export default RestaurantAddModal;
