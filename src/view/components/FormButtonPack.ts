import { $ } from '../../util/querySelector';

type FormButtonPackType = {
  parentElement: HTMLElement;
  event: {
    onCancelEvent: () => void;
    onAddEvent: () => void;
  };
  info: {
    cancelButtonId: string;
    addButtonId: string;
    cancelButtonDisplayName: string;
    addButtonDisplayName: string;
  };
};

class FormButtonPack {
  #parentElement;
  #onCancelEvent;
  #onAddEvent;
  #info;

  constructor({ parentElement, event, info }: FormButtonPackType) {
    this.#parentElement = parentElement;
    this.#onCancelEvent = event.onCancelEvent;
    this.#onAddEvent = event.onAddEvent;
    this.#info = info;
    this.#render();
    this.#setEvent();
  }

  #render() {
    const element = `
      <div class="button-container">
        <button
          type="button"
          class="button button--secondary text-caption"
          id="${this.#info.cancelButtonId}"
        >${this.#info.cancelButtonDisplayName}</button>
        <button 
          class="button button--primary text-caption"
          id="${this.#info.addButtonId}"
        >${this.#info.addButtonDisplayName}</button>
      </div>`;

    if (this.#parentElement) {
      this.#parentElement.insertAdjacentHTML(
        'beforeEnd' as InsertPosition,
        element
      );
    }
  }

  #setEvent() {
    if (this.#info.cancelButtonId) {
      $(`#${this.#info.cancelButtonId}`).addEventListener('click', () => {
        // this.#onCancelEvent();
        console.log('Cancel Event');
      });
    }

    if (this.#info.addButtonId) {
      $(`#${this.#info.addButtonId}`).addEventListener('click', (event) => {
        event.preventDefault();
        // this.#onAddEvent();
        console.log('Add Event');
      });
    }
  }
}

export default FormButtonPack;
