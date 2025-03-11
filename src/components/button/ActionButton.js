import createDOMElement from '../../util/createDomElement.js';

function ActionButton({ text, ...attribute }) {
  return createDOMElement({
    tag: 'button',
    class: ['button', 'button--secondary', 'text-caption'],
    textContent: text,
    ...attribute,
  });
}

export default ActionButton;
