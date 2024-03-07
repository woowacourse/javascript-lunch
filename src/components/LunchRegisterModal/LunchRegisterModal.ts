import './style.css';
import '../LunchFormItem/LunchFormItem';
import '../LunchButton/LunchButton';

import LunchFormItem, { FormItemType } from '../LunchFormItem/LunchFormItem';

// TODO: lunch-form-item prop들 변경하기
const LUNCH_REGISTER_MODAL = /* html */ `
<div class="modal">
  <div class="modal-backdrop"></div>
  <div class="modal-container">
    <h2 class="modal-title text-title">새로운 음식점</h2>
    <form>
      <lunch-form-item type="dropdown" name="category" label="카테고리" message=""></lunch-form-item>
      <lunch-form-item type="input" name="name"></lunch-form-item>
      <lunch-form-item type="dropdown" name="distance"></lunch-form-item>
      <lunch-form-item type="textArea" name="description"></lunch-form-item>
      <lunch-form-item type="input" name="link"></lunch-form-item>
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
  }

  setSubmitListener() {
    this.addEventListener('submit', (event) => {
      const forms: NodeListOf<LunchFormItem> = this.querySelectorAll('lunch-form-item');
      forms.forEach((form: LunchFormItem) => {
        console.log(form.getValue(form.getAttribute('type') as FormItemType));
        event.preventDefault();
        console.log(event.target);
      });
    });
  }

}

customElements.define('lunch-register-modal', LunchRegisterModal);
