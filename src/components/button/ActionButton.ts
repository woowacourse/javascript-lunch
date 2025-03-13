import { AttributeWithoutChildren } from '../../types/typeUtils';
import createDOMElement from '../../util/createDomElement';

interface ActionButtonProps extends AttributeWithoutChildren<'button'> {
  text: string;
  onclick?: () => void;
}

function ActionButton({ text, onclick, ...attribute }: ActionButtonProps) {
  return createDOMElement({
    tag: 'button',
    class: 'button button--secondary text-caption',
    onclick,
    textContent: text,
    ...attribute,
  });
}

export default ActionButton;
