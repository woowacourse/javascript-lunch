import createDOMElement from '../util/createDomElement.js';

function CTAButton({ text }) {
  return createDOMElement({
    tag: 'button',
    class: ['button', 'button--primary', 'text-caption'],
    textContent: text,
  });
}

export default CTAButton;
