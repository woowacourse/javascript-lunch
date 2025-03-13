import { AttributeWithoutChildren } from '../../types/typeUtils';
import createDOMElement from '../../util/createDomElement';

interface CTAButtonProps extends AttributeWithoutChildren<'button'> {
  text: string;
  onclick?: () => void;
}

function CTAButton({ text, onclick, ...attribute }: CTAButtonProps) {
  return createDOMElement({
    tag: 'button',
    class: 'button button--primary text-caption',
    onclick,
    textContent: text,
    ...attribute,
  });
}

export default CTAButton;
