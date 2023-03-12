import { Attribute, parseAttribute } from '../../../utils/common/domHelper';

interface SelectProps {
  attribute?: Attribute;
  children: string;
}

interface OptionProps {
  attribute?: Attribute;
  children: string;
}

function Select(props: SelectProps) {
  const { children, attribute } = props;
  return `
    <select ${attribute ? parseAttribute(attribute) : ''}>
      ${children}
    </select>
  `;
}

function Option(props: OptionProps) {
  const { children, attribute } = props;

  return `<option ${attribute ? parseAttribute(attribute) : ''}>${children}</option>`;
}

Select.Option = Option;

export { Select };
