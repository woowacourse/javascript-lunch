/* eslint-disable prettier/prettier */
import './style.css';

import { CATEGORIES } from '../../constants/categories';
import { DISTANCE } from '../../constants/distance';

export type FormItemType = 'dropdown' | 'input' | 'textArea';

export interface FormItemProps {
  name: string;
  type: FormItemType;
  label: string;
  message: string;
  required: boolean;
}

type FormTypeLookupTable = Record<FormItemType, (props: FormItemProps) => void>;

type DropdownOptionsTable = {
  [keys: string]: Record<string, string | number>;
};

type FormElementsTable = Record<FormItemType, string>;

const LUNCH_FORM_ITEM = (props: FormItemProps) => `
<div class="form-item">
<label for="category text-caption">${props.label}</label>
</div>
`;

const LUNCH_FORM_ITEM_DROPDOWN = (props: FormItemProps) => `
<select name="${props.name}" id="${props.name}" class="dropdown-items" ${props.required ? 'required' : ''
  }>
</select>
`;

const DROPDOWN_OPTION = (value: string) => `
<option value=${value}>${value}</option>
`;

const LUNCH_FORM_ITEM_INPUT = (props: FormItemProps) => `
<input type="text" name="${props.name}" id="${props.name}" ${props.required ? 'required' : ''}>
`;

const LUNCH_FORM_ITEM_TEXTAREA = (props: FormItemProps) => `
<textarea name="${props.name}" id="${props.name}" cols="30" rows="5" ${props.required ? 'required' : ''
  }></textarea>
`;

const LUNCH_FORM_ITEM_MESSAGE = (props: FormItemProps) => `
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
    this.innerHTML = LUNCH_FORM_ITEM({ name, type, label, message, required });
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
    const FORM_TYPE_LOOKUP_TABLE: FormTypeLookupTable = {
      dropdown: () => this.renderDropdown(props),
      input: () => this.renderInput(props),
      textArea: () => this.renderTextArea(props),
    };
    const renderTypeFunction = FORM_TYPE_LOOKUP_TABLE[props.type];
    renderTypeFunction(props);
  }

  renderDropdown(props: FormItemProps) {
    this.querySelector('.form-item')?.insertAdjacentHTML(
      'beforeend',
      LUNCH_FORM_ITEM_DROPDOWN(props),
    );
    this.renderDropdownOptions(props);
  }

  renderDropdownOptions(props: FormItemProps): void {
    const optionItems: string[] = ["<option value=''>선택해 주세요</option>"];
    this.appendDropdownOptions(props.name, optionItems);
    const options = this.querySelector('.dropdown-items');

    if (options) {
      options.innerHTML = optionItems.join('');
    }
  }

  appendDropdownOptions(option: string, optionItems: string[]) {
    const DROPDOWN_OPTIONS_TABLE: DropdownOptionsTable = {
      category: CATEGORIES,
      distance: DISTANCE,
    };
    Object.values(DROPDOWN_OPTIONS_TABLE[option]).forEach((element) => {
      optionItems.push(DROPDOWN_OPTION(`${element}`));
    });
  }

  renderInput(props: FormItemProps) {
    this.querySelector('.form-item')?.insertAdjacentHTML('beforeend', LUNCH_FORM_ITEM_INPUT(props));
  }

  renderTextArea(props: FormItemProps) {
    this.querySelector('.form-item')?.insertAdjacentHTML(
      'beforeend',
      LUNCH_FORM_ITEM_TEXTAREA(props),
    );
  }

  renderMessages(props: FormItemProps) {
    this.querySelector('.form-item')?.insertAdjacentHTML(
      'beforeend',
      LUNCH_FORM_ITEM_MESSAGE(props),
    );
  }

  getValue(type: FormItemType) {
    const FORM_ELEMENTS_VALUE_TABLE: FormElementsTable = {
      dropdown: this.querySelector('select')?.value ?? '',
      input: this.querySelector('input')?.value ?? '',
      textArea: (this.querySelector('textArea') as HTMLTextAreaElement)?.value,
    };
    return FORM_ELEMENTS_VALUE_TABLE[type];
  }
}
customElements.define('lunch-form-item', LunchFormItem);

export default LunchFormItem;
