import { $ } from '../util/querySelector';

type HeaderType = {
  parentElement: HTMLElement;
  info: {
    headerTitle: string;
    addButtonId: string;
  };
  parentEvent: {
    onHeaderAddButtonClicked: () => void;
  };
};

class Header {
  #parentElement;
  #info;
  #parentEvent;

  constructor({ parentElement, info, parentEvent }: HeaderType) {
    this.#parentElement = parentElement;
    this.#info = info;
    this.#parentEvent = parentEvent;

    this.#render();
    this.#addListeners();
  }

  #render() {
    const element = `
      <header class="gnb">
        <h1 class="gnb__title text-title">${this.#info.headerTitle}</h1>
        <button type="button" class="gnb__button" id="${
          this.#info.addButtonId
        }" aria-label="음식점 추가">
          <img src="./add-button.png" alt="음식점 추가" />
        </button>
      </header>`;

    if (this.#parentElement) {
      this.#parentElement.insertAdjacentHTML(
        'beforeEnd' as InsertPosition,
        element
      );
    }
  }

  #addListeners() {
    $(`#${this.#info.addButtonId}`).addEventListener('click', () => {
      this.#parentEvent.onHeaderAddButtonClicked();
    });
  }
}

export default Header;
