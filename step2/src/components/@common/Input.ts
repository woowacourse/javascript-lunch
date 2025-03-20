import { Attribute, parseAttribute } from '../../utils/@common/domHelper';

interface InputProps {
  attribute: Attribute;
}
function Input(props: InputProps) {
  const { attribute } = props;

  return `
    <input ${attribute ? parseAttribute(attribute) : ''} />
  `;
}

export default Input;
