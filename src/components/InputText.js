import { convertStringToElement } from '../utils/convertStringToElement.js';

const LABEL_TEMPLATE = (type, title) => {
  return `<label for="${type} text-caption">${title}</label>`;
};
const INPUT_TEMPLATE = (tag) => {
  return `<input type="text" name="${tag}" id="${tag}" required />`;
};
const TEXTAREA_TEMPLATE = () => {
  return `<textarea name="description" id="description" cols="30" rows="5"></textarea>
    `;
};
const SPAN_TEMPLATE = (text) => {
  return `<span class="help-text text-caption">${text}</span>`;
};

class InputText {
  constructor(title) {
    return this.#createInputText(title);
  }
  #createInputText = (title) => {
    if (title === '이름') return this.#handleName(title);
    if (title === '설명') return this.#handleDescription(title);
    if (title === '참조 링크') return this.#handleLink(title);
  };

  #handleName = () => {
    const formItem = document.createElement('div');
    formItem.classList.add('form-item');
    formItem.classList.add('form-item--required');
    formItem.innerHTML = `${LABEL_TEMPLATE('name', '이름')}${INPUT_TEMPLATE('name')}`;
    return formItem;
  };

  #handleDescription = () => {
    const formItem = document.createElement('div');
    formItem.classList.add('form-item');
    formItem.innerHTML = `${LABEL_TEMPLATE('description', '설명')}${TEXTAREA_TEMPLATE()}${SPAN_TEMPLATE(
      '메뉴 등 추가 정보를 입력해 주세요.',
    )}`;
    return formItem;
  };

  #handleLink = () => {
    const formItem = document.createElement('div');
    formItem.classList.add('form-item');
    formItem.innerHTML = `${LABEL_TEMPLATE('link', '참고 링크')}${INPUT_TEMPLATE('link')}${SPAN_TEMPLATE(
      '매장 정보를 확인할 수 있는 링크를 입력해 주세요.',
    )}`;
    return formItem;
  };
}

export default InputText;
