export default class Header {
  constructor({ container }) {
    this.container = container;
  }

  renderHeader() {
    this.container.innerHTML += `<h1 class="gnb__title text-title">점심 뭐 먹지</h1>
      <button
        id="gnb-button"
        type="button"
        class="gnb__button"
        aria-label="음식점 추가"
      >
        <img src="./add-button.png" alt="음식점 추가" />
      </button>`;
  }
}
