import { Attribute, parseAttribute } from '../../utils/@common/domHelper';

interface ButtonProps {
  children: string;
  attribute: Attribute;
}

function Button(props: ButtonProps) {
  const { children, attribute } = props;

  return `
    <button ${attribute ? parseAttribute(attribute) : ''}>${children}</button>
  `;
}

export default Button;
