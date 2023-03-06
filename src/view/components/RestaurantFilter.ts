import { $ } from '../../util/querySelector';

type RestaurantFilterType = {
  parentElement: HTMLElement;
  info: {
    id: string;
    choices: { value: string; displayName: string }[];
  };
  event: {
    onChange: () => void;
  };
};

class RestaurantFilter {
  #parentElement;
  #info;
  #event;

  constructor({ parentElement, info, event }: RestaurantFilterType) {
    this.#parentElement = parentElement;
    this.#info = info;
    this.#event = event;
    this.#render();
    this.#setEvent();
  }

  #render() {
    const element = `
      <select name="category" id="${this.#info.id}" class="restaurant-filter">
        ${this.#info.choices
          .map(
            (choice) =>
              `<option value="${choice.value}">${choice.displayName}</option>`
          )
          .join('')}
      </select>`;

    if (this.#parentElement) {
      this.#parentElement.insertAdjacentHTML(
        'beforeEnd' as InsertPosition,
        element
      );
    }
  }

  #setEvent() {
    if (this.#info.id) {
      $(`#${this.#info.id}`).addEventListener('change', () => {
        this.#event.onChange();
      });
    }
  }
}

export default RestaurantFilter;
