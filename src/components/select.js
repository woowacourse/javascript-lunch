import { $inBody } from '../utils/selector';

class Select {
  #props = {
    id: '',
    name: '',
    class: '',
    optionList: [],
  };

  constructor(props) {
    this.#props = props;
  }

  render(selector) {
    $inBody(selector).insertAdjacentHTML('beforeend', this.#template());
  }

  #template() {
    return `
			<label
				for="${this.#props.id}"
			/>
			<select
				name="${this.#props.name}"
				id="${this.#props.id}"
				class="${this.#props.class}">
				${this.#props.optionList
          .map(
            option => `<option value="${option.value}">${option.text}</option>`
          )
          .join('')}
			</select>
		`;
  }
}

export default Select;
