import createDOMElement from '../../util/createDomElement.js';

function CTAButton({ text, ...attribute }) {
  return createDOMElement({
    tag: 'button',
    class: ['button', 'button--primary', 'text-caption'],
    textContent: text,
    ...attribute,
  });
}

export default CTAButton;
