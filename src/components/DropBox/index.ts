import './style.css';

import { DROP_BOX_MAP } from '../../constants';
import { DropBoxName } from '../../types';

class DropBox extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const dropBoxName = this.getAttribute('name') as DropBoxName;

    if (this.#isDropBoxName(dropBoxName)) {
      this.#setInnerHtml(dropBoxName);
    }
  }

  #isDropBoxName(name: string): name is DropBoxName {
    const dropBoxNames: DropBoxName[] = [
      'category',
      'distance',
      'filteringCategory',
      'filteringSorting',
    ];

    return ([...dropBoxNames] as string[]).includes(name);
  }

  #setInnerHtml(name: DropBoxName) {
    const dropBoxProps = DROP_BOX_MAP.get(name);

    if (!dropBoxProps) return;

    const { selectProps, labelText, options } = dropBoxProps;

    this.innerHTML = /* html */ `
        <label class="screen-read-only" for="${selectProps.id}">
          ${labelText}
        </label >
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

customElements.define('drop-box', DropBox);
