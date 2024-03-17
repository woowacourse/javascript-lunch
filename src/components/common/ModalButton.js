import BaseComponent from "./BaseComponent";

class ModalButton extends BaseComponent {
  render() {
    this.innerHtml = `
      <div class="button-container">
        <button
          type="reset"
          id="reset-button"
          class="button button--secondary text-caption"
        >
          취소하기
        </button>
        <button type="submit" class="button button--primary text-caption">
          추가하기
        </button>
      </div>
    `;
  }
}

customElements.define("modal-button", ModalButton);
