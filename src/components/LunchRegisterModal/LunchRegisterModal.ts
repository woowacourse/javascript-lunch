import './style.css';
// eslint-disable-next-line import/no-duplicates
import '../LunchFormItem/LunchFormItem';
import '../LunchButton/LunchButton';
import LunchFormItem, { FormItemType } from '../LunchFormItem/LunchFormItem';
import { RestaurantRegistry } from '../../domain';
import LunchItems from '../LunchItems/LunchItems';
import { Restaurant } from '../../types';

const LUNCH_REGISTER_MODAL = /* html */ `
<div class="modal">
  <div class="modal-backdrop"></div>
  <div class="modal-container">
    <h2 class="modal-title text-title">새로운 음식점</h2>
    <form>
      <lunch-form-item type="dropdown" name="category" label="카테고리"  required="true"></lunch-form-item>
      <lunch-form-item type="input" name="name" label="가게명"  required="true"></lunch-form-item>
      <lunch-form-item type="dropdown" name="distance" label="거리(도보 이동 시간)"  required="true"></lunch-form-item>
      <lunch-form-item type="textArea" name="description" label="설명" message="메뉴 등 추가 정보를 입력해 주세요." ></lunch-form-item>
      <lunch-form-item type="input" name="link" label="링크" message="매장 정보를 확인할 수 있는 링크를 입력해 주세요." ></lunch-form-item>
      <div class="button-container">
        <lunch-button type="button" text="취소하기" color="secondary"></lunch-button>
        <lunch-button text="추가하기" color="primary"></lunch-button>
      </div>
    </form>
</div>
`;

class LunchRegisterModal extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setEventListener();
    this.setSubmitListener();
  }

  render(): void {
    this.innerHTML = LUNCH_REGISTER_MODAL;
  }

  setEventListener() {
    const cancelButton = this.querySelector('.button--secondary');
    cancelButton?.addEventListener('click', () => {
      this.handleModalClose();
    });
  }

  handleModalClose() {
    const modal = this.querySelector('.modal');
    if (modal?.className) {
      modal.classList.remove('modal--open');
    }

    this.querySelector('form')?.reset();
  }

  setSubmitListener() {
    this.addEventListener('submit', (event) => {
      event.preventDefault();

      const newRestaurant: Restaurant = this.getNewRestaurant();
      RestaurantRegistry.registerOneRestaurant(newRestaurant);
      this.handleModalClose();
      this.handleDropDown();
    });
  }

  getNewRestaurant() {
    const forms: NodeListOf<LunchFormItem> = this.querySelectorAll('lunch-form-item');
    const newRestaurant = { createdAt: new Date() } as Restaurant;
    forms.forEach((form: LunchFormItem) => {
      const key = form.getAttribute('name') ?? '';
      const value = form.getValue(form.getAttribute('type') as FormItemType) ?? '';
      newRestaurant[key] = value;
    });
    return newRestaurant;
  }

  handleDropDown() {
    const dropdowns = document.querySelectorAll('lunch-dropdown');
    dropdowns.forEach((dropdown) => {
      const select = dropdown.querySelector('select');
      if (select) {
        select.options[0].selected = true;
      }
    });
    this.handleRenderItems();
  }

  handleRenderItems() {
    const items = document.querySelector('lunch-items') as LunchItems;
    items.renderItems({});
  }
}

customElements.define('lunch-register-modal', LunchRegisterModal);
