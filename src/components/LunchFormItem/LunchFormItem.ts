import './style.css';

import { CATEGORIES } from '../../constants/categories';
import { DISTANCE } from '../../constants/distance';
import textInput from '../../utils/textInput';

export type FormItemType = 'dropdown' | 'input' | 'textArea';

export interface FormItemProps {
  name: string;
  type: FormItemType;
  label: string;
  message: string;
  required: boolean;
}

type FormTableType = Record<FormItemType, () => void>;
type FormItemTableType = Record<FormItemType, string>;

const LUNCH_FORM_ITEM_TEMPLATE = (props: FormItemProps) => /* HTML */ `
  <div class="form-item">
    <label for="category text-caption">${props.label}</label>
  </div>
`;

const LUNCH_FORM_ITEM_DROPDOWN_TEMPLATE = (props: FormItemProps) => /* HTML */ `
  <select
    name="${props.name}"
    id="${props.name}"
    class="dropdown-items"
    ${props.required ? 'required' : ''}
  ></select>
`;

const DROPDOWN_OPTION_TEMPLATE = (value: string) => /* HTML */ `
  <option value=${value}>${value}</option>
`;

const LUNCH_FORM_ITEM_INPUT_TEMPLATE = (props: FormItemProps) => /* HTML */ `
  <input type="text" name="${props.name}" id="${props.name}" ${props.required ? 'required' : ''} />
`;

const LUNCH_FORM_ITEM_TEXTAREA_TEMPLATE = (props: FormItemProps) => /* HTML */ `
  <textarea
    name="${props.name}"
    id="${props.name}"
    cols="30"
    rows="5"
    ${props.required ? 'required' : ''}
  ></textarea>
`;

const LUNCH_FORM_ITEM_MESSAGE_TEMPLATE = (props: FormItemProps) => /* HTML */ `
  <span class="help-text text-caption">${props.message}</span>
`;

class LunchFormItem extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render(): void {
    const type = this.getAttribute('type') as FormItemType;
    const name = this.getAttribute('name') ?? '';
    const label = this.getAttribute('label') ?? '';
    const message = this.getAttribute('message') ?? '';
    const required = this.getAttribute('required') === 'true';
    this.innerHTML = LUNCH_FORM_ITEM_TEMPLATE({ name, type, label, message, required });
    this.renderDetails({ name, type, label, message, required });
  }

  renderDetails(props: FormItemProps) {
    this.renderRequired(props);
    this.renderTypes(props);
    this.renderMessages(props);
  }

  renderRequired(props: FormItemProps) {
    if (props.required) {
      this.querySelector('.form-item')?.classList.add('form-item--required');
    }
  }

  renderTypes(props: FormItemProps) {
    const formTable: FormTableType = {
      dropdown: () => this.renderDropdown(props),
      input: () => this.renderInput(props),
      textArea: () => this.renderTextArea(props),
    };
    const renderTypeFunction = formTable[props.type];
    renderTypeFunction();
  }

  renderDropdown(props: FormItemProps) {
    this.querySelector('.form-item')?.insertAdjacentHTML(
      'beforeend',
      LUNCH_FORM_ITEM_DROPDOWN_TEMPLATE(props),
    );
    this.renderDropdownOptions(props);
  }

  renderDropdownOptions(props: FormItemProps): void {
    const optionItems: string[] = ["<option value=''>선택해 주세요</option>"];
    if (props.name === 'category') {
      Object.values(CATEGORIES).forEach((element) => {
        optionItems.push(DROPDOWN_OPTION_TEMPLATE(element));
      });
    }
    if (props.name === 'distance') {
      Object.values(DISTANCE).forEach((element) => {
        optionItems.push(DROPDOWN_OPTION_TEMPLATE(`${element}`));
      });
    }
    textInput.setInnerHtml.call(this, '.dropdown-items', optionItems);
  }

  renderInput(props: FormItemProps) {
    this.querySelector('.form-item')?.insertAdjacentHTML(
      'beforeend',
      LUNCH_FORM_ITEM_INPUT_TEMPLATE(props),
    );
  }

  renderTextArea(props: FormItemProps) {
    this.querySelector('.form-item')?.insertAdjacentHTML(
      'beforeend',
      LUNCH_FORM_ITEM_TEXTAREA_TEMPLATE(props),
    );
  }

  renderMessages(props: FormItemProps) {
    this.querySelector('.form-item')?.insertAdjacentHTML(
      'beforeend',
      LUNCH_FORM_ITEM_MESSAGE_TEMPLATE(props),
    );
  }

  getValue(type: FormItemType) {
    const formItemTable: FormItemTableType = {
      dropdown: this.querySelector('select')?.value ?? '',
      input: this.querySelector('input')?.value ?? '',
      textArea: this.querySelector('textarea')?.value ?? '',
    };
    return formItemTable[type];
  }
}
customElements.define('lunch-form-item', LunchFormItem);

export default LunchFormItem;
