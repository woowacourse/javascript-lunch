import { setAttribute } from '../../utils/domUtils';

type ElementIdentifier = {
  idName?: string;
  className?: string;
  name?: string;
};

export type elementValue = [value: string, content: string];

type OptionElement = {
  values: elementValue[];
  selectedIndex?: number;
  disabledIndex?: number;
};

const optionTemplate = ({ values, selectedIndex, disabledIndex }: OptionElement) => {
  return values
    .map(
      ([value, text], idx) =>
        `<option value="${value}" ${disabledIndex === idx ? 'disabled' : ''} ${
          selectedIndex === idx ? 'selected' : ''
        }>${text}</option>`
    )
    .join('');
};

export const selectTemplate = (option: OptionElement, identifier: ElementIdentifier) => {
  const { idName, className, name } = identifier;

  return `
  <select ${setAttribute('name', name)} ${setAttribute('class', className)} ${setAttribute(
    'id',
    idName
  )}
  }>
    ${optionTemplate(option)}
  </select>`;
};
