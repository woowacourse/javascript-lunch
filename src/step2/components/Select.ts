import { Attribute, parseAttribute } from '../utils/@common/domHelper';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  attribute: Attribute;
  children?: string;
}

interface OptionProps {
  options: SelectOption[];
  selectedValue: string;
}

function Select(props: SelectProps) {
  const { attribute, children } = props;

  return `
    <select ${parseAttribute(attribute)}>
      ${children}
    </select>
  `;
}

function Option(props: OptionProps) {
  const { options, selectedValue } = props;

  return `
    ${options
      .map(
        (option) => `
        <option value="${option.value}" ${
          option.value === selectedValue ? 'selected' : ''
        }>${option.label}</option>
      `
      )
      .join('')}
  `;
}

Select.Option = Option;

export default Select;
