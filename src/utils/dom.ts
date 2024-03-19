import type {
  IButtonAttributes,
  IDropdownAttributes,
  IOptionAttributes,
  IImageAttributes,
  IDomCreation,
} from '../types/dom';

const dom = {
  getElement<T extends HTMLElement>(selector: string): T {
    const element: T | null = document.querySelector(selector);
    if (element === null) {
      throw Error(`${selector} is not found`);
    }
    return element;
  },

  getTargetElement($target: HTMLElement, selector: string): HTMLElement {
    const element = $target.querySelector(selector);
    if (element === null) {
      throw Error(`${selector} is not found`);
    }
    return element as HTMLElement;
  },

  create({ tagName, id, classNames, text, children }: IDomCreation) {
    const tag = document.createElement(tagName);
    if (id) tag.id = id;
    if (text) tag.textContent = text;
    if (classNames) {
      classNames.forEach(className => {
        tag.classList.add(className);
      });
    }
    if (children) {
      children.forEach(child => {
        tag.appendChild(child);
      });
    }
    return tag;
  },

  createImageTag({ src, alt, classNames }: IImageAttributes): HTMLImageElement {
    const imageTag = document.createElement('img');

    imageTag.setAttribute('src', src);
    if (alt) imageTag.setAttribute('alt', alt);
    if (classNames) {
      classNames.forEach(className => {
        imageTag.classList.add(className);
      });
    }
    return imageTag;
  },

  createSelectTag({ id, classNames, name, required }: IDropdownAttributes): HTMLSelectElement {
    const selectTag = document.createElement('select');

    if (id) selectTag.id = id;
    if (classNames != null) {
      classNames.forEach(className => {
        selectTag.classList.add(className);
      });
    }
    if (name) selectTag.name = name;
    if (required) selectTag.required = required;

    return selectTag;
  },

  createButtonTag({
    id,
    classNames,
    name,
    type = 'button',
    text,
    ariaLabel,
    disabled = false,
  }: IButtonAttributes): HTMLButtonElement {
    const buttonTag = document.createElement('button');

    if (id) buttonTag.id = id;
    if (classNames) {
      classNames.forEach(className => {
        buttonTag.classList.add(className);
      });
    }
    if (name) buttonTag.name = name;
    if (type) buttonTag.setAttribute('type', type);
    if (text) buttonTag.textContent = text;
    if (ariaLabel) buttonTag.setAttribute('aria-label', ariaLabel);
    buttonTag.disabled = disabled;

    return buttonTag;
  },

  createOptionTag({ value, text }: IOptionAttributes): HTMLOptionElement {
    const optionTag = document.createElement('option');
    optionTag.setAttribute('value', value);
    optionTag.textContent = text;
    return optionTag;
  },
};

export default dom;
