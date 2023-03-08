import actions from '../../hooks/actions';
import { $ } from '../../utils/querySelector';
import RestaurantList from './RestaurantList';

type SelectorProps = {
  $target: Element;
  info: {
    name: 'category' | 'sorting';
    id: 'category-filter' | 'sorting-filter';
    options: { value: string; name: string }[];
  };
};

class Selector {
  #target;
  #info;

  constructor({ $target, info }: SelectorProps) {
    this.#target = $target;
    this.#info = info;

    this.setEvent();
  }

  #template(selector: string) {
    return `
    <select name="${this.#info.name}" id="${
      this.#info.id
    }" class="restaurant-filter">
        ${this.#info.options
          .map(
            (option) =>
              `<option value="${option.value}" ${
                selector === option.value ? 'selected' : ''
              }>${option.name}</option>`
          )
          .join('')}
      </select>
    `;
  }

  render(selector: string) {
    this.#target.innerHTML += this.#template(selector);
  }

  setEvent() {
    this.#target.addEventListener('change', (e) => {
      if (
        e.target instanceof HTMLSelectElement &&
        e.target.closest(`#${this.#info.id}`)
      ) {
        if (this.#info.name === 'category') {
          actions.filterRestaurantsCategory(e.target.value);
        }

        if (this.#info.name === 'sorting' && e.target.value === 'name') {
          actions.sortRestaurantsName();
        }

        if (this.#info.name === 'sorting' && e.target.value === 'distance') {
          actions.sortRestaurantsDistance();
        }

        new RestaurantList($('.restaurant-list-wrapper')).render();
      }
    });
  }
}

export default Selector;
