import { $ } from '../../util/querySelector';

type FormButtonPackType = {
  parentElement: HTMLElement;
  info: {
    cancelButtonId: string;
    addButtonId: string;
    cancelButtonDisplayName: string;
    addButtonDisplayName: string;
  };
  event: {
    onCancel: () => void;
    onAdd: () => void;
  };
};

class FormButtonPack {
  #parentElement;
  #info;
  #event;

  constructor({ parentElement, event, info }: FormButtonPackType) {
    this.#parentElement = parentElement;
    this.#info = info;
    this.#event = event;
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
        this.#event.onCancel();
      });
    }

    if (this.#info.addButtonId) {
      $(`#${this.#info.addButtonId}`).addEventListener('click', (event) => {
        event.preventDefault();
        console.log('Add Clicked - PaCK');
        this.#event.onAdd();
      });
    }
  }
}

export default FormButtonPack;
