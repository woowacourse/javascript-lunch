import { Attribute, parseAttribute, parseClassToSelector } from '../../utils/common/domHelper';
import { useEvents } from '../../utils/core';

interface ButtonProps {
  attribute: Attribute;
  children?: string;
  onClick?(): void;
}

function Button(props: ButtonProps) {
  const { onClick, attribute, children } = props;

  const [addEvent] = useEvents(parseClassToSelector(attribute.class));

  onClick && addEvent('click', parseClassToSelector(attribute.class), onClick);

  return `<button ${attribute ? parseAttribute(attribute) : ''}>${children}</button>`;
}

export { Button };
