import AddButtonIcon from '../../assets/svg/add-button.svg';
import './style.css';

class AddStoreBtn extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = /* html */ `
    <button>
      <img src=${AddButtonIcon} alt="음식점 추가 버튼"/>
    </button>
    `;

    this.addEventListener('click', (event) =>
      this.#handleClickToAddStore(event),
    );
  }

  #handleClickToAddStore(event: MouseEvent) {
    event.stopPropagation();

    const modalEl = document
      .querySelector('custom-modal')
      ?.shadowRoot?.querySelector('.modal');
    const bodyEl = document.querySelector('body');

    if (modalEl) {
      modalEl.classList.add('open');
    }

    if (bodyEl) {
      bodyEl.style.overflowY = 'hidden';
    }
  }
}

customElements.define('add-store-btn', AddStoreBtn);
