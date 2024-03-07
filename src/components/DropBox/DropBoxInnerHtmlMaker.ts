import './style.css';
import ArrowIcon from '../../assets/svg/down-arrow.svg';
import { DropBoxMap } from '../../constants';
import { DropBoxName } from '../../types';

class DropBoxInnerHtmlMaker {
  #html?: string;

  constructor(name: DropBoxName) {
    this.#setHTML(name);
  }

  #getDropBoxProps(name: DropBoxName) {
    return DropBoxMap.get(name);
  }

  get html() {
    return this.#html;
  }

  #setHTML(name: DropBoxName) {
    const dropBoxProps = this.#getDropBoxProps(name);

    if (dropBoxProps) {
      const { selectProps, labelText, options } = dropBoxProps;

      const html = `
        <label class="screen-read-only" for="${selectProps.id}">
          ${labelText}
        </label >
        <img src=${ArrowIcon} class="arrow-icon"/>
        <select
          name="${selectProps.name}"
          id="${selectProps.id}"
          class="${selectProps.class}"
        >
        ${options
          .map(
            (option) =>
              `<option value="${option.value}" ${option.hidden ? 'hidden' : ''}>${option.text}</option>`,
          )
          .join('')}
        </select>
    `;

      this.#html = html;
    }
  }
}
export default DropBoxInnerHtmlMaker;
