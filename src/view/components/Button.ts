import { Attribute, parseAttribute } from '../../utils/common/domHelper';
import { useEvents } from '../../utils/core';

interface ButtonProps {
  attribute: Attribute;
  children?: string;
  onClick?(): void;
}

function Button(props: ButtonProps) {
  const { onClick, attribute, children } = props;
  const [addEvent] = useEvents(attribute.class);

  onClick && addEvent('click', '.button--secondary', onClick);

  return `<button ${attribute ? parseAttribute(attribute) : ''}>${children}</button>`;
}

export { Button };
