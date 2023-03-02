import GLOBAL_CSS from '../constants';

class AddRestaurantModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const globalStyle = document.createElement('style');
    const componentStyle = document.createElement('style');
    globalStyle.textContent = GLOBAL_CSS;
    componentStyle.textContent = `
    .modal {
        display: none;
      }
      
      .modal--open {
        display: block;
      }
      
      .modal-backdrop {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.35);
      }
      
      .modal-container {
        position: fixed;
        width: 100%;
        bottom: 0;
        max-width: 390px;
        padding: 32px 16px;
        border-radius: 8px 8px 0px 0px;
        background: var(--grey-100);
      }
      
      .modal-title {
        margin-bottom: 36px;
      }
`;

    const template = document.createElement('template');

    template.innerHTML = `
    <div class="modal modal--open">
    <div class="modal-backdrop"></div>
    <div class="modal-container">
      <h2 class="modal-title text-title">새로운 음식점</h2>
      <form>
        <div class="button-container">
        </div>
      </form>
    </div>
  </div>
    `;

    const cloneNode = template.content.cloneNode(true);

    this.shadowRoot.appendChild(globalStyle);
    this.shadowRoot.appendChild(componentStyle);
    this.shadowRoot.appendChild(cloneNode);
  }
}

export default AddRestaurantModal;
