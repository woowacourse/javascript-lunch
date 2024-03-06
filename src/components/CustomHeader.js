import addButtonImg from '../assets/add-button.png';

class CustomHeader extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    if (this.isConnected) {
      this.render();
      this.setEvent();
    }
  }

  disconnectedCallback() {
    this.removeEvent();
  }

  render() {
    this.innerHTML = this.template();
  }

  setEvent() {
    this.querySelector('.gnb__button').addEventListener('click', () => {
      this.dispatchEvent(
        new CustomEvent('gnbButtonClick', {
          bubbles: true,
        }),
      );
    });
  }

  removeEvent() {}

  template() {
    return `
      <header class="gnb">
        <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
        <button type="button" class="gnb__button" aria-label="음식점 추가">
          <img src=${addButtonImg} alt="음식점 추가">
        </button>
      </header>
    `;
  }
}

export default CustomHeader;
