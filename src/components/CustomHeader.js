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
    this.querySelector('.gnb__button').addEventListener('click', () => this.buttonOnClick());
  }

  removeEvent() {
    this.querySelector('.gnb__button').removeEventListener('click', () => this.buttonOnClick());
  }

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

  buttonOnClick() {
    alert('버튼이 클릭되었습니다.');
  }
}

export default CustomHeader;
