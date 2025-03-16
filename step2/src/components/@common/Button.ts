import { Attribute, parseAttribute } from '../../utils/@common/domHelper';

interface ButtonProps {
  children: string;
  attribute: Attribute;
}

export const Button = ({ children, attribute }: ButtonProps) => {
  return `
    <button ${attribute ? parseAttribute(attribute) : ''}>${children}</button>
  `;
};

export default Button;
