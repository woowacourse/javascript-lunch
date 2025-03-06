import createDOMElement from '../util/createDomElement.js';

function Modal({ content }) {
  return createDOMElement({
    tag: 'div',
    class: 'modal',
    children: [
      createDOMElement({
        tag: 'div',
        class: 'modal-backdrop',
      }),
      content,
    ],
  });
}

export default Modal;
