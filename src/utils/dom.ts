import type { IButtonAttributes, ISelectAttributes, IOptionAttributes } from '../types/dom';

const dom = {
  createSelectTag({ id, classNames, name, required }: ISelectAttributes): HTMLSelectElement {
    const selectTag = document.createElement('select');
    selectTag.name = name ?? '';
    selectTag.id = id ?? '';
    if (classNames != null) {
      classNames.forEach(className => {
        selectTag.classList.add(className);
      });
    }
    selectTag.name = name ?? '';
    selectTag.required = required ?? false;
    return selectTag;
  },

  createButtonTag({ id, classNames, name, type, text }: IButtonAttributes): HTMLButtonElement {
    const buttonTag = document.createElement('button');
    buttonTag.name = name ?? '';
    buttonTag.id = id ?? '';
    if (classNames != null) {
      classNames.forEach(className => {
        buttonTag.classList.add(className);
      });
    }
    buttonTag.type = type ?? 'submit';
    buttonTag.textContent = text ?? '';
    return buttonTag;
  },

  createOptionTag({ value, text }: IOptionAttributes): HTMLOptionElement {
    const optionTag = document.createElement('option');
    optionTag.value = value;
    optionTag.textContent = text;
    return optionTag;
  },
};

export default dom;
