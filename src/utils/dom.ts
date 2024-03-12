import type {
  IButtonAttributes,
  IDropdownAttributes,
  IOptionAttributes,
  IImageAttributes,
  IDomCreation,
} from '../types/dom';

const dom = {
  getElement(selector: string): HTMLElement {
    const element = document.querySelector(selector);
    if (element === null) {
      throw Error(`${selector} is not found`);
    }
    return element as HTMLElement;
  },

  create({ tagName, id, classNames, text, children }: IDomCreation) {
    const tag = document.createElement(tagName);
    tag.id = id ?? '';
    tag.textContent = text ?? '';
    if (classNames != null) {
      classNames.forEach(className => {
        tag.classList.add(className);
      });
    }
    if (children != null) {
      children.forEach(child => {
        tag.appendChild(child);
      });
    }
    return tag;
  },

  createImageTag({ classNames, src, alt }: IImageAttributes): HTMLImageElement {
    const imageTag = document.createElement('img');
    imageTag.src = src ?? '';
    imageTag.alt = alt ?? '';
    if (classNames != null) {
      classNames.forEach(className => {
        imageTag.classList.add(className);
      });
    }
    return imageTag;
  },

  createSelectTag({ id, classNames, name, required }: IDropdownAttributes): HTMLSelectElement {
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
