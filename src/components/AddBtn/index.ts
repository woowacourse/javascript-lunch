import AddButtonIcon from '../../assets/svg/add-button.svg';
import './style.css';

class AddBtn extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = /*html*/ `<button>
      <img src=${AddButtonIcon} alt="음식점 추가 버튼"/>
    </button>
    `;

    this.addEventListener('click', (event) =>
      this.#handleClickToAddStore(event),
    );
  }

  #handleClickToAddStore(event: MouseEvent) {
    event.stopPropagation();
  }
}
customElements.define('add-btn', AddBtn);
