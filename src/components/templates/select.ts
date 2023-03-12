import { setAttribute } from '@res/utils/domUtils';

type ElementIdentifier = {
  idName?: string;
  className?: string;
  name?: string;
};

type elementValue = [value: string, content: string];

type OptionElement = {
  values: elementValue[];
  selectedIndex?: number;
  disabledIndex?: number;
};

const optionTemplate = ({ values, selectedIndex, disabledIndex }: OptionElement) => {
  return values
    .map(
      (value, idx) =>
        `<option value="${value[0]}" ${disabledIndex === idx ? 'disabled' : ''} ${
          selectedIndex === idx ? 'selected' : ''
        }>${value[1]}</option>`
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
  } required>
    ${optionTemplate(option)}
  </select>`;
};
