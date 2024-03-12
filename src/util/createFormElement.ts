import type {
  FormItemContainerElementType,
  LabelElementType,
  InputElementType,
  SelectBoxElementType,
  TextAreaElementType,
  CaptionElementType,
  ButtonElementType,
  OptionItemType,
} from '../type/formElementTypes';

export function createInput({ type, name, required }: InputElementType): HTMLInputElement {
  const input = document.createElement('input');
  input.type = type;
  input.name = name;
  input.id = `restaurant-${name}`;
  input.required = required;
  return input;
}

export function createTextArea({ name, cols, rows, required }: TextAreaElementType): HTMLTextAreaElement {
  const textArea = document.createElement('textarea');
  textArea.name = name;
  textArea.id = `restaurant-${name}`;
  textArea.cols = cols;
  textArea.rows = rows;
  textArea.required = required;
  return textArea;
}

export function createSelectBox({ name, required }: SelectBoxElementType): HTMLSelectElement {
  const selectBox = document.createElement('select');
  selectBox.name = name;
  selectBox.id = `restaurant-${name}`;
  selectBox.required = required;
  return selectBox;
}

export function createLabel({ targetId, labelText }: LabelElementType): HTMLLabelElement {
  const label = document.createElement('label');
  label.textContent = labelText;
  label.htmlFor = targetId;
  label.classList.add('text-caption');
  return label;
}

export function createCaption({ captionText }: CaptionElementType) {
  const caption = document.createElement('span');
  caption.classList.add('help-text', 'text-caption');
  caption.textContent = captionText;
  return caption;
}

export function createFormItemContainer({ required }: FormItemContainerElementType): HTMLDivElement {
  const formItemContainer = document.createElement('div');
  formItemContainer.classList.add('form-item');
  if (required) {
    formItemContainer.classList.add('form-item--required');
  }
  return formItemContainer;
}

export function createFormButtonContainer() {
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('button-container');
  return buttonContainer;
}

export function createFormButton({ type, style, id, textContent }: ButtonElementType) {
  const button = document.createElement('button');
  button.type = type;
  button.id = id;
  button.classList.add('button', `button--${style}`, 'text-caption');
  button.textContent = textContent;
  return button;
}

export function createOptionItem(value: string, text: string): HTMLOptionElement {
  const optionItem = document.createElement('option');
  optionItem.value = value;
  optionItem.textContent = text;
  return optionItem;
}

export function createOptionItems({ type, defaultOption }: OptionItemType): HTMLOptionElement[] {
  const items: HTMLOptionElement[] = [];
  if (defaultOption) {
    items.push(createOptionItem('', defaultOption));
  }
  Object.entries(type).forEach(([text, value]) => {
    items.push(createOptionItem(value, text));
  });
  return items;
}
