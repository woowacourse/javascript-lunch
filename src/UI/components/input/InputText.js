class InputText {
  constructor(title) {
    return this.#createInputFormItem(title);
  }

  #createInputFormItem(title) {
    if (title === '이름') return this.#createNameFormItem(title);
    if (title === '설명') return this.#createDescriptionFormItem(title);
    if (title === '참조 링크') return this.#createLinkFormItem(title);
  }

  #createNameFormItem(title) {
    const formItem = document.createElement('div');
    formItem.classList.add('form-item');
    formItem.classList.add('form-item--required');
    formItem.appendChild(this.#createLabel('name', '이름'));
    formItem.appendChild(this.#createInput('name'));
    return formItem;
  }

  #createDescriptionFormItem() {
    const formItem = document.createElement('div');
    formItem.classList.add('form-item');
    formItem.appendChild(this.#createLabel('description', '설명'));
    formItem.appendChild(this.#createTextarea());
    formItem.appendChild(this.#createSpan('메뉴 등 추가 정보를 입력해 주세요.'));
    return formItem;
  }

  #createLinkFormItem() {
    const formItem = document.createElement('div');
    formItem.classList.add('form-item');
    formItem.appendChild(this.#createLabel('link', '참고 링크'));
    formItem.appendChild(this.#createInput('link'));
    formItem.appendChild(this.#createSpan('매장 정보를 확인할 수 있는 링크를 입력해 주세요.'));
    return formItem;
  }

  #createLabel(type, title) {
    const label = document.createElement('label');
    label.setAttribute('for', type);
    label.classList.add('text-caption');
    label.textContent = title;
    return label;
  }

  #createInput(tag) {
    const input = document.createElement('input');
    input.type = 'text';
    input.name = tag;
    input.id = tag;
    input.required = true;
    return input;
  }

  #createTextarea() {
    const textarea = document.createElement('textarea');
    textarea.name = 'description';
    textarea.id = 'description';
    textarea.cols = 30;
    textarea.rows = 5;
    return textarea;
  }

  #createSpan(text) {
    const span = document.createElement('span');
    span.classList.add('help-text');
    span.classList.add('text-caption');
    span.textContent = text;
    return span;
  }
}

export default InputText;
