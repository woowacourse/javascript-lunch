import './style.css';
import ArrowIcon from '../../assets/svg/down-arrow.svg';

class DropBox {
  $dropBoxEl = document.createElement('div');

  constructor(
    selectProps: {
      labelText: string;
      name?: string;
      id: string;
      class?: string;
    },
    options: string[],
  ) {
    this.$dropBoxEl.setAttribute('class', 'dropbox');
    const html = this.#getInnerHTML(selectProps, options);

    this.$dropBoxEl.innerHTML = html;
  }

  get dropBoxEl() {
    return this.$dropBoxEl;
  }

  #getInnerHTML(
    selectProps: {
      labelText: string;
      name?: string;
      id: string;
      class?: string;
    },
    options: string[],
  ) {
    const html = `
      <label class="screen-read-only" for="${selectProps.id}">
        ${selectProps.labelText}
      </label >
      <img src=${ArrowIcon} class="arrow-icon"/>
      <select
        name="${selectProps.name}"
        id="${selectProps.id}"
        class="${selectProps.class}"
      >
      ${options
        .map((option) => `<option value="${option}">${option}</option>`)
        .join('')}
      </select>
    `;

    return html;
  }
}
export default DropBox;
