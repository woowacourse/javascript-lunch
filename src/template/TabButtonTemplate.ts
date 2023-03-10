import { Attribute, ButtonContent } from '../types/types';

function createTabButton(
  inputAttributes: Attribute,
  labelAttributes: Attribute,
  content: ButtonContent
) {
  return `
    <input 
      type="radio" 
      name="${inputAttributes.name}"
      class="${inputAttributes.className}" 
      id="${inputAttributes.id}"
      ${inputAttributes.checked ? `checked="${inputAttributes.checked}"` : ''}
    />
    <label 
      for="${labelAttributes.for}"
      class="${labelAttributes.className}"
    >
      ${content}
    </label>`;
}

export { createTabButton };
