import createDOMElement from '../../util/createDomElement.js';

function ActionButton({ text }) {
  return createDOMElement({
    tag: 'button',
    class: ['button', 'button--secondary', 'text-caption'],
    textContent: text,
  });
}

export default ActionButton;
