import { $ } from '../../util/querySelector';

type TwinButtonsType = {
  parentElement: HTMLElement;
  info: {
    leftButtonId: string;
    rightButtonId: string;
    leftButtonName: string;
    rightButtonName: string;
  };
  parentEvent: {
    onLeftButtonClicked?: () => void;
    onRightButtonClicked?: () => void;
  };
};

class TwinButtons {
  #parentElement;
  #info;
  #parentEvent;

  constructor({ parentElement, info, parentEvent }: TwinButtonsType) {
    this.#parentElement = parentElement;
    this.#info = info;
    this.#parentEvent = parentEvent;

    this.#render();
    this.#addListeners();
  }

  #render() {
    const template = `
      <div class="button-container">
        <button type="button" class="button button--secondary text-caption" id="${
          this.#info.leftButtonId
        }">${this.#info.leftButtonName}</button>
        <button class="button button--primary text-caption" id="${
          this.#info.rightButtonId
        }">${this.#info.rightButtonName}</button>
      </div>
    `;

    if (this.#parentElement) {
      this.#parentElement.insertAdjacentHTML(
        'beforeEnd' as InsertPosition,
        template
      );
    }
  }

  #addListeners() {
    $(`#${this.#info.leftButtonId}`).addEventListener('click', () => {
      if (this.#parentEvent.onLeftButtonClicked !== undefined) {
        this.#parentEvent.onLeftButtonClicked();
      }
    });

    $(`#${this.#info.rightButtonId}`).addEventListener('click', () => {
      if (this.#parentEvent.onRightButtonClicked !== undefined) {
        this.#parentEvent.onRightButtonClicked();
      }
    });
  }
}

export default TwinButtons;
