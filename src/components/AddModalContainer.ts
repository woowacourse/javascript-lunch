import { categorySelectionList, distanceSelectionList } from '../constants/listForSelection';
import { INPUT_MESSAGE } from '../constants/messages';
import Component from '../core/Component';
import { eventBus } from '../core/eventBus';
import { RestaurantInput } from '../interfaces/RestaurantInput';
import { restaurantStore } from '../model/restaurantStore';
import { $, on } from '../utils/domUtils';
import {
  isValidCategory,
  isValidDescription,
  isValidDistance,
  isValidLink,
  isValidName,
} from '../validator/inputValidator';
import { buttonTemplate } from './templates/button';
import { selectTemplate } from './templates/select';

class AddModalContainer extends Component {
  constructor(element: HTMLElement) {
    super(element);

    this.subscribe();
  }

  subscribe() {
    eventBus.subscribe('@click-add-modal', () => {
      this.render().setEvent();
    });

    return this;
  }

  hide(isOn: boolean = true) {
    if (isOn) this.$target.innerHTML = '';

    return this;
  }

  setEvent() {
    on({
      target: $('.restaurant-form'),
      eventName: 'submit',
      handler: this.handleSubmit.bind(this),
    });

    on({
      target: $('.modal-backdrop'),
      eventName: 'click',
      handler: () => {
        this.hide();
      },
    });

    on({
      target: $('.cancel'),
      eventName: 'click',
      handler: () => {
        this.hide();
      },
    });

    return this;
  }

  handleSubmit(event: Event) {
    const $form = event?.target;

    if (!($form instanceof HTMLFormElement)) {
      return;
    }

    const restaurantInput = this.getInputs($form);

    if (!this.validate(restaurantInput)) {
      event.preventDefault();
      this.showValidationMessage(restaurantInput);
      return;
    }

    this.updateRestaurant(restaurantInput);

    eventBus.dispatch('@add-restaurant', restaurantInput);

    this.hide();
  }

  showValidationMessage({ category, name, distance, description, link }: RestaurantInput): void {
    $('#category-message').style.visibility = isValidCategory(category) ? 'hidden' : 'visible';

    $('#name-message').style.visibility = isValidName(name) ? 'hidden' : 'visible';

    $('#distance-message').style.visibility = isValidDistance(distance) ? 'hidden' : 'visible';

    $('#description-message').style.visibility = isValidDescription(description)
      ? 'hidden'
      : 'visible';

    $('#link-message').style.visibility = isValidLink(link) ? 'hidden' : 'visible';
  }

  getInputs($form: HTMLFormElement): RestaurantInput {
    return [...new FormData($form).entries()].reduce(
      (acc: Partial<RestaurantInput>, [key, value]) => {
        acc[key as keyof RestaurantInput] = value as string;
        return acc;
      },
      {}
    ) as RestaurantInput;
  }

  validate({ category, name, distance, description, link }: RestaurantInput): boolean {
    return (
      isValidCategory(category) &&
      isValidName(name) &&
      isValidDistance(distance) &&
      isValidDescription(description) &&
      isValidLink(link)
    );
  }

  updateRestaurant(restaurantInput: RestaurantInput) {
    return restaurantStore.addList(restaurantInput);
  }

  getElementValue(element: HTMLElement): string {
    if (
      element instanceof HTMLInputElement ||
      element instanceof HTMLSelectElement ||
      element instanceof HTMLTextAreaElement
    ) {
      return element.value;
    }

    return '';
  }

  template(): string {
    return `
      <div class="modal modal--open">
        <div class="modal-backdrop"></div>
        <div class="modal-container">
          <h2 class="modal-title text-title">새로운 음식점</h2>
          <form class="restaurant-form" >
            <div class="form-item form-item--required">
              <label for="category text-caption">카테고리</label>
              ${selectTemplate(
                {
                  values: categorySelectionList,
                  selectedIndex: 0,
                  disabledIndex: 0,
                },
                { idName: 'category-input', name: 'category' }
              )}
              <p id='category-message' class='input-error-message' style="visibility:hidden">${
                INPUT_MESSAGE.category
              }<p/>
            </div>
            <div class="form-item form-item--required">
            <label for="name text-caption">이름</label>
            <input type="text" name="name" id="name-input"/>
              <p id='name-message' class='input-error-message' style="visibility:hidden">${
                INPUT_MESSAGE.name
              }<p/>
            </div>
            <div class="form-item form-item--required">
              <label for="distance text-caption">거리(도보 이동 시간) </label>
              ${selectTemplate(
                {
                  values: distanceSelectionList,
                  selectedIndex: 0,
                  disabledIndex: 0,
                },
                { idName: 'distance-input', name: 'distance' }
              )}
              <p id='distance-message' class='input-error-message' style="visibility:hidden">${
                INPUT_MESSAGE.distance
              }<p/>
            </div>
            <div class="form-item">
              <label for="description text-caption">설명</label>
              <textarea
                name="description"
                id="description-input"
                cols="30"
                rows="5"
              ></textarea>
              <p id='description-message' class='input-error-message' style="visibility:hidden">${
                INPUT_MESSAGE.description
              }<p/>
              <span class="help-text text-caption"
                >메뉴 등 추가 정보를 입력해 주세요.</span
              >
            </div>
            <div class="form-item">
              <label for="link text-caption">참고 링크</label>
              <input type="text" name="link" id="link-input" />
              <span class="help-text text-caption"
                >매장 정보를 확인할 수 있는 링크를 입력해 주세요.</span
              >
              <p id='link-message' class='input-error-message' style="visibility:hidden">${
                INPUT_MESSAGE.link
              }<p/>
            </div>
            <div class="button-container">
            ${buttonTemplate(
              { content: '취소하기', type: 'button' },
              { className: 'button button--secondary text-caption cancel' }
            )}
            ${buttonTemplate(
              { content: '추가하기' },
              { className: 'button button--primary text-caption submit-restaurant' }
            )}
            </div>
          </form>
        </div>
      </div>`;
  }
}
export default AddModalContainer;
