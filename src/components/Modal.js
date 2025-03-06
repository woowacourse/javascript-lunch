import createDOMElement from '../util/createDomElement.js';

function Modal({ content }) {
  const modal = createDOMElement({
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

  function open() {
    modal.classList.add('modal--open');
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleEscKey);
  }

  function close() {
    modal.classList.remove('modal--open');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', handleEscKey);
  }

  function handleEscKey(event) {
    if (event.key === 'Escape') {
      close();
    }
  }

  modal.querySelector('.modal-backdrop').addEventListener('click', close);

  return { modal, open, close };
}

export default Modal;
