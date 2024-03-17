import Component from './Component';
import { ERROR } from '../constants/messages';
import { $, $addEvent, $removeEvent } from '../utils/dom';
import { isEmptyInput } from '../utils/validation';

class RestaurantAddForm extends Component {
  static observedAttributes: string[] = ['open'];

  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    this.render();
    this.#updateModal(JSON.parse(newValue));
    this.setEvent();
  }

  setEvent(): void {
    $addEvent('.modal-form', 'submit', this.#handleOnSubmit.bind(this));
    $addEvent('.button--secondary', 'click', this.#handleOnCancel.bind(this));
  }

  removeEvent(): void {
    $removeEvent('.modal-form', 'submit', this.#handleOnSubmit.bind(this));
    $removeEvent('.button--secondary', 'click', this.#handleOnCancel.bind(this));
  }

  #updateModal(isOpen: boolean): void {
    if (isOpen) {
      ($('.modal') as HTMLElement).classList.add('modal--open');
    } else {
      ($('.modal') as HTMLElement).classList.remove('modal--open');
    }
  }

  #handleOnSubmit(event: Event): void {
    event.preventDefault();
    if (this.#handleEmptyError(['.modal-category', '.modal-restaurant-name', '.modal-distance'])) {
      return;
    }

    const formData = {
      category: ($('.modalCategory') as HTMLFormElement).value,
      name: ($('.modal-restaurant-name') as HTMLFormElement).value,
      distance: ($('.modalDistance') as HTMLFormElement).value,
      description: ($('.modal-description') as HTMLFormElement).value,
      reference: ($('.modal-reference') as HTMLFormElement).value,
      favorite: false,
    };
    this.makeCustomEvent('submitButtonClick', formData);
    this.#updateModal(false);
  }

  #handleOnCancel(): void {
    this.makeCustomEvent('cancelButtonClick');
  }

  #handleEmptyError(selectors: string[]): boolean {
    const errors = selectors.filter((selector: string) => {
      if (isEmptyInput(($(selector) as HTMLSelectElement).value)) {
        ($(`${selector}-error-message`) as HTMLElement).textContent = ERROR.NULL;
        return true;
      }

      ($(`${selector}-error-message`) as HTMLElement).textContent = '';
      return false;
    });

    if (!errors.length) {
      return false;
    }

    ($(errors[0]) as HTMLElement).focus();
    return true;
  }

  template(): string {
    return `
          <div class="modal">
              <div class="modal-backdrop"></div>
              <div class="modal-container">
                  <h2 class="modal-title text-title">새로운 음식점</h2>
                  <form class="modal-form">
                      <div class="form-item form-item--required">
                          <label for="category text-caption">카테고리</label>
                          <filter-box type="modalCategory" class="modal-category" ></filter-box>
                          <p class="modal-category-error-message"></p>
                      </div>
                      <div class="form-item form-item--required">
                          <label for="name text-caption">이름</label>
                          <input class="modal-restaurant-name" type="text" name="name" id="name" />
                          <p class="modal-restaurant-name-error-message"></p>
                      </div>
                      <div class="form-item form-item--required">
                          <label for="distance text-caption">거리(도보 이동 시간)</label>
                          <filter-box type="modalDistance" class="modal-distance" ></filter-box>
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

export default RestaurantAddForm;
