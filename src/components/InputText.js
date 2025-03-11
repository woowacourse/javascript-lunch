import { convertStringToElement } from '../utils/convertStringToElement.js';

const DESCRIPTION_PROPS = Object.freeze({
  COLS: 30,
  ROWS: 5,
});

const LABEL_TEMPLATE = (type, title) => {
  return `<label for="${type} text-caption">${title}</label>`;
};
const INPUT_TEMPLATE = (tag, required) => {
  return `<input type="text" name="${tag}" id="${tag}"  ${required ? 'required' : ''} />`;
};
const TEXTAREA_TEMPLATE = () => {
  return `<textarea name="description" id="description" cols="${DESCRIPTION_PROPS.COLS}" rows="${DESCRIPTION_PROPS.ROWS}"></textarea>
    `;
};
const SPAN_TEMPLATE = (text) => {
  return `<span class="help-text text-caption">${text}</span>`;
};

const FEILD_INFO = Object.freeze({
  이름: { type: 'name', title: '이름', required: true },
  설명: {
    type: 'description',
    title: '설명',
    isTextArea: true,
    spanText: '매장 정보를 확인할 수 있는 링크를 입력해 주세요.',
  },
  '참조 링크': {
    type: 'link',
    title: '참조 링크',
    required: false,
    spanText: '매장 정보를 확인할 수 있는 링크를 입력해 주세요.',
  },
});

class InputText {
  #input;
  #inputContainer;

  constructor(title) {
    this.#inputContainer = this.#createInputText(FEILD_INFO[title]);
    return this;
  }

  #createInputText = ({ type, title, required, isTextArea = false, spanText }) => {
    const formItem = document.createElement('div');
    formItem.classList.add('form-item');
    if (required) formItem.classList.add('form-item--required');

    const label = LABEL_TEMPLATE(type, title);
    const input = isTextArea ? TEXTAREA_TEMPLATE() : INPUT_TEMPLATE(type, required);
    const span = spanText ? SPAN_TEMPLATE(spanText) : '';

    formItem.innerHTML = `${label}${input}${span}`;
    this.#input = formItem.querySelector(`#${type}`);

    return formItem;
  };

  reset = () => {
    if (this.#input) {
      this.#input.value = '';
    }
  };

  getElement = () => {
    return this.#inputContainer;
  };
}

export default InputText;
