import './style.css';
// eslint-disable-next-line import/no-duplicates
import '../LunchFormItem/LunchFormItem';
import LunchButton from '../LunchButton/LunchButton';
// eslint-disable-next-line import/no-duplicates
import LunchFormItem, { FormItemType } from '../LunchFormItem/LunchFormItem';
import { RestaurantRegistry } from '../../domain';
import { Restaurant } from '../../types';
import LunchItemFilter from '../LunchItemFilter/LunchItemFilter';
import LunchModal from '../LunchModal/LunchModal';

const LUNCH_REGISTER_MODAL = /* html */ `
    <h2 class="register-modal-title text-title">새로운 음식점</h2>
    <form>
      <lunch-form-item type="dropdown" name="category" label="카테고리"  required="true"></lunch-form-item>
      <lunch-form-item type="input" name="name" label="가게명"  required="true"></lunch-form-item>
      <lunch-form-item type="dropdown" name="distance" label="거리(도보 이동 시간)"  required="true"></lunch-form-item>
      <lunch-form-item type="textArea" name="description" label="설명" message="메뉴 등 추가 정보를 입력해 주세요." ></lunch-form-item>
      <lunch-form-item type="input" name="link" label="링크" message="매장 정보를 확인할 수 있는 링크를 입력해 주세요." ></lunch-form-item>
      <div class="button-container">
        
      </div>
    </form>
`;

class LunchRegisterModal extends HTMLElement {
  constructor() {
    super();
    this.appendChild(new LunchModal());
  }

  connectedCallback() {
    this.render();
  }

  render(): void {
    const container = this.querySelector('.modal-container');
    if (container) {
      container.innerHTML = LUNCH_REGISTER_MODAL;
    }
    this.createButtons();
  }

  handleModalClose() {
    const modal = this.querySelector('.modal');
    if (modal?.className) {
      modal.classList.remove('modal--open');
    }
  }

  // eslint-disable-next-line max-lines-per-function
  createButtons() {
    const buttonContainer = this.querySelector('.button-container');
    buttonContainer?.appendChild(
      new LunchButton({
        color: 'secondary',
        type: 'button',
        text: '취소하기',
        onClick: this.handleModalClose.bind(this),
      }),
    );
    buttonContainer?.appendChild(
      new LunchButton({
        color: 'primary',
        type: 'submit',
        text: '추가하기',
        onClick: this.handleSubmit.bind(this),
      }),
    );
  }

  handleSubmit() {
    const newRestaurant: Restaurant = this.getNewRestaurant();
    RestaurantRegistry.registerOneRestaurant(newRestaurant);
    this.handleModalOpen();
    this.querySelector('form')?.reset();
    this.resetFilter();
    this.renderItems();
  }

  getNewRestaurant() {
    const forms: NodeListOf<LunchFormItem> = this.querySelectorAll('lunch-form-item');
    const newRestaurant = { createdAt: Date.now() } as Restaurant;
    forms.forEach((form: LunchFormItem) => {
      const key = form.getAttribute('name') ?? '';
      const value = form.getValue(form.getAttribute('type') as FormItemType) ?? '';
      newRestaurant[key] = value;
    });
    return newRestaurant;
  }

  handleModalOpen() {
    const modal = this.querySelector('.modal') as LunchModal;
    modal?.handleModalOpen();
  }

  handleDropDown() {
    const dropdowns = document.querySelectorAll('restaurant-filter');
    dropdowns.forEach((dropdown) => {
      const select = dropdown.querySelector('select');
      if (select) {
        select.options[0].selected = true;
      }
    });
    this.renderItems();
  }

  renderItems() {
    const renderEvent = new CustomEvent('render', { bubbles: true });
    this.dispatchEvent(renderEvent);
  }

  resetFilter() {
    const filter = document.querySelector('lunch-item-filter') as LunchItemFilter;
    filter.resetDropdown();
  }
}

customElements.define('lunch-register-modal', LunchRegisterModal);
