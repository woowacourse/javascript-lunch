import AddButtonIcon from '../../assets/svg/add-button.svg';
import { openModal } from '../../utils';
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

    openModal('<restaurant-form-inner></<restaurant-form-inner>');
  }
}

customElements.define('add-store-btn', AddStoreBtn);
