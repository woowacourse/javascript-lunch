import {
  RestaurantCategoryType,
  RestaurantSortingType,
} from '../../type/common';

type SelectorProps = {
  $target: HTMLElement;
  info: {
    name: 'category' | 'sorting';
    id: 'category-filter' | 'sorting-filter';
    options: { value: string; name: string }[];
    selected: RestaurantCategoryType | RestaurantSortingType;
  };
  onChangeEvent: (value: string) => void;
};

class Selector {
  #target;
  #info;
  #onChangeEvent;

  constructor({ $target, info, onChangeEvent }: SelectorProps) {
    this.#target = $target;
    this.#info = info;
    this.#onChangeEvent = onChangeEvent;

    this.render();
    this.#setEvent();
  }

  #template() {
    return `
      <select name="${this.#info.name}" id="${
      this.#info.id
    }" class="restaurant-filter">
        ${this.#info.options
          .map(
            (option) =>
              `<option value="${option.value}" ${
                this.#info.selected === option.value ? 'selected' : ''
              }>${option.name}</option>`
          )
          .join('')}
      </select>
    `;
  }

  render() {
    this.#target.innerHTML += this.#template();
  }

  #setEvent() {
    this.#target.addEventListener('change', (e: Event) => {
      if (
        e.target instanceof HTMLSelectElement &&
        e.target.closest(`#${this.#info.id}`)
      ) {
        this.#onChangeEvent(e.target.value);
      }
    });
  }
}

export default Selector;
