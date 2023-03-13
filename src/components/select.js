import '../../css/filter.css';
import { $ } from '../utils/selector';

class Select {
  #state = {
    selector: '',
    id: '',
    name: '',
    class: '',
    optionList: [],
  };

  constructor(state) {
    this.#state = state;
  }

  render() {
    $(this.#state.selector).insertAdjacentHTML('beforeend', this.#template());
    this.show();
  }

  show() {
    $(this.#state.selector).classList.add('restaurant-filter-container--open');
  }

  hide() {
    $(this.#state.selector).classList.remove(
      'restaurant-filter-container--open'
    );
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
            .map(
              option =>
                `<option value="${option.value}">${option.text}</option>`
            )
            .join('')}
				</select>
		`;
  }
}

export default Select;
