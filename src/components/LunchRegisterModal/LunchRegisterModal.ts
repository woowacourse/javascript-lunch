import './style.css';
import '../LunchFormItem/LunchFormItem';
import '../LunchButton/LunchButton';

// TODO: lunch-form-item prop들 변경하기
const LUNCH_REGISTER_MODAL = /* html */ `
<div class="modal modal--open">
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
            <lunch-button text="취소하기" color="secondary"></lunch-button>
            <lunch-button text="추가하기" color="primary"></lunch-button>
          </div>
        </form>
      </div>

`;

class LunchRegisterModal extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render(): void {
    this.innerHTML = LUNCH_REGISTER_MODAL;
  }
}

customElements.define('lunch-register-modal', LunchRegisterModal);
