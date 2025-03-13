import { AttributeWithoutChildren } from '../../types/typeUtils.js';
import createDOMElement from '../../util/createDomElement.js';

interface PlusButtonProps extends AttributeWithoutChildren<'button'> {
  onclick?: () => void;
}

function PlusButton({ onclick, ...attribute }: PlusButtonProps) {
  return createDOMElement({
    tag: 'button',
    type: 'button',
    class: 'gnb__button',
    onclick,
    ...attribute,
    'aria-label': '음식점 추가',
    children: [
      createDOMElement({
        tag: 'img',
        src: 'images/add-button.png',
        alt: '음식점 추가',
      }),
    ],
  });
}

export default PlusButton;
