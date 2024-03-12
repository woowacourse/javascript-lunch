import { OptionItemType } from '../type/formElementTypes';

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
