import { $ } from '../util/querySelector';

type HeaderType = {
  parentElement: HTMLElement;
  parentEvent: {
    onHeaderAddButtonClicked: () => void;
  };
};

class Header {
  #parentElement;
  #parentEvent;

  constructor({ parentElement, parentEvent }: HeaderType) {
    this.#parentElement = parentElement;
    this.#parentEvent = parentEvent;

    this.#render();
    this.#addListeners();
  }

  #render() {
    const template = `
      <header class="gnb">
        <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
        <button type="button" class="gnb__button" id="header-add-button" aria-label="음식점 추가">
          <img src="./add-button.png" alt="음식점 추가" />
        </button>
      </header>`;

    this.#parentElement.innerHTML = template;
  }

  #addListeners() {
    $('#header-add-button').addEventListener('click', () => {
      this.#parentEvent.onHeaderAddButtonClicked();
    });
  }
}

export default Header;
