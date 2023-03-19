import '../../css/filter.css';
import { $ } from '../utils/selector';
import { SELECT_OPTION_LIST } from '../constants/filter';

class Select {
  #state = {
    container: '',
    id: '',
    name: '',
    class: '',
    optionList: SELECT_OPTION_LIST.CATEGORY,
  };

  constructor(state: {
    container: string;
    id: string;
    name: string;
    class: string;
    optionList: typeof SELECT_OPTION_LIST.CATEGORY | typeof SELECT_OPTION_LIST.SORTING;
  }) {
    this.#state = state;
  }

  render() {
    const selectContainer = $(this.#state.container);

    if (selectContainer) {
      selectContainer.insertAdjacentHTML('beforeend', this.#template());
      this.show();
    }
  }

  show() {
    const selectContainer = $(this.#state.container);

    if (selectContainer) {
      selectContainer.classList.add('restaurant-filter-container--open');
    }
  }

  hide() {
    const selectContainer = $(this.#state.container);

    if (selectContainer) {
      selectContainer.classList.remove('restaurant-filter-container--open');
    }
  }

  #template() {
    /* html */
    return `
				<label
					for="${this.#state.id}"
				/>
				<select
					name="${this.#state.name}"
					id="${this.#state.id}"
					class="${this.#state.class}">
					${this.#state.optionList
            .map(option => `<option value="${option.value}">${option.text}</option>`)
            .join('')}
				</select>
		`;
  }
}

export default Select;
