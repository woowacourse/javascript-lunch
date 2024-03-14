import './style.css';

const LUNCH_DETAIL_MODAL_TEMPLATE = /* HTML */ `
  <div class="modal">
    <div class="modal-backdrop"></div>
  </div>
`;

class LunchDetailModal extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = LUNCH_DETAIL_MODAL_TEMPLATE;
  }
}

customElements.define('lunch-detail-modal', LunchDetailModal);
