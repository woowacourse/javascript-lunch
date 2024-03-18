import './style.css';
import { DropBoxName } from '../../types';
import ArrowIcon from '../../assets/svg/down-arrow.svg';
import { DROP_BOX_MAP } from '../../constants';
class DropBox extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const dropBoxName = this.getAttribute('name') as DropBoxName;
    const dropBoxProps = this.#getDropBoxProps(dropBoxName);

    if (dropBoxProps) {
      const { selectProps, labelText, options } = dropBoxProps;

      this.innerHTML = /*html*/ `
        <label class="screen-read-only" for="${selectProps.id}">
          ${labelText}
        </label >
        <img src=${ArrowIcon} class="arrow-icon"/>
        <select
          name="${selectProps.name}"
          id="${selectProps.id}"
          class="${selectProps.class}"
          ${selectProps.required ? 'required' : ''}
        >
        ${options
          .map(
            (option) =>
              `<option value="${option.value}" ${option.hidden ? 'hidden' : ''}>${option.text}</option>`,
          )
          .join('')}
        </select>
    `;
    }
  }

  #getDropBoxProps(name: DropBoxName) {
    return DROP_BOX_MAP.get(name);
  }
}
customElements.define('drop-box', DropBox);
