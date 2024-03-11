import Component from './Component';
import RestaurantRepository from '../domain/RestaurantRepository';
import { $, $addEvent, $removeEvent } from '../utils/dom';
import { isEmptyInput } from '../utils/validation';
import { OPTION } from '../constants/Condition';
import { ERROR } from '../constants/Message';

class RestaurantAddModal extends Component {
  static observedAttributes = ['open'];

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
    this.setEvent();
    this.#updateModal(JSON.parse(newValue));
  }

  setEvent() {
    $addEvent('.button--primary', 'click', this.#onSubmit);
    $addEvent('.button--secondary', 'click', this.#onCancel);
  }

  removeEvent() {
    $removeEvent('.button--primary', 'click', this.#onSubmit);
    $removeEvent('.button--secondary', 'click', this.#onCancel);
  }

  #updateModal(isOpen) {
    if (isOpen) {
      $('.modal').classList.add('modal--open');
    } else {
      $('.modal').classList.remove('modal--open');
    }
  }

  #onSubmit = (event) => {
    event.preventDefault();

    if (this.#handleEmptyError(['.modal-category', '.modal-restaurant-name', '.modal-distance'])) {
      return;
    }

    const formData = {
      category: $('.modal-category').value,
      name: $('.modal-restaurant-name').value,
      distance: $('.modal-distance').value,
      description: $('.modal-description').value,
      reference: $('.modal-reference').value,
    };

    RestaurantRepository.addRestaurant(formData);
    this.#updateModal(false);
  };

  #onCancel = () => {
    this.#updateModal(false);
  };

  #handleEmptyError(selectors) {
    const errors = selectors.filter((selector) => {
      if (isEmptyInput($(selector).value)) {
        $(`${selector}-error-message`).textContent = ERROR.NULL;
        return true;
      }

      $(`${selector}-error-message`).textContent = '';
      return false;
    });

    if (!errors.length) {
      return false;
    }

    $(errors[0]).focus();
    return true;
  }

  template() {
    return `
          <div class="modal">
              <div class="modal-backdrop"></div>
              <div class="modal-container">
                  <h2 class="modal-title text-title">새로운 음식점</h2>
                  <form>
                      <div class="form-item form-item--required">
                          <label for="category text-caption">카테고리</label>
                          <filter-box type="modal-category" option='${JSON.stringify([
                            OPTION.INFO,
                            ...OPTION.CATEGORY,
                          ])}'></filter-box>
                          <p class="modal-category-error-message"></p>
                      </div>
                      <div class="form-item form-item--required">
                          <label for="name text-caption">이름</label>
                          <input class="modal-restaurant-name" type="text" name="name" id="name" />
                          <p class="modal-restaurant-name-error-message"></p>
                      </div>
                      <div class="form-item form-item--required">
                          <label for="distance text-caption">거리(도보 이동 시간)</label>
                          <filter-box type="modal-distance" option='${JSON.stringify([
                            OPTION.INFO,
                            ...OPTION.DISTANCE,
                          ])}'></filter-box>
                          <p class="modal-distance-error-message"></p>
                      </div>
                      <div class="form-item">
                          <label for="description text-caption">설명</label>
                          <textarea name="description" class="modal-description" id="description" cols="30" rows="5"></textarea>
                          <span class="help-text text-caption">메뉴 등 추가 정보를 입력해 주세요.</span>
                      </div>
                      <div class="form-item">
                          <label for="link text-caption">참고 링크</label>
                          <input type="text" name="reference" class="modal-reference" id="reference" />
                          <span class="help-text text-caption">매장 정보를 확인할 수 있는 링크를 입력해 주세요.</span>
                          <p class="modal-reference-error-message"></p>
                      </div>
                      <div class="button-container">
                          <button type="button" class="button button--secondary text-caption">취소하기</button>
                          <button class="button button--primary text-caption">추가하기</button>
                      </div>
                  </form>
              </div>
          </div>
      `;
  }
}

export default RestaurantAddModal;
