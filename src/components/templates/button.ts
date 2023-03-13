import { ElementIdentifier } from '../../interfaces/ElementIdentifier';
import { setAttribute } from '../../utils/domUtils';

type ButtonElement = {
  content: string;
  type?: string;
};

export const buttonTemplate = (option: ButtonElement, identifier: ElementIdentifier) => {
  const { content, type } = option;
  const { idName, className } = identifier;

  return `<button
  ${setAttribute('type', type)} ${setAttribute('class', className)} ${setAttribute('id', idName)}>
  ${content}
</button>`;
};
