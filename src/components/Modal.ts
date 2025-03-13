import createDOMElement from '../util/createDomElement';
import { $ } from '../util/selector';

function Modal({ content }: { content: HTMLElement }): { modal: HTMLElement; open: () => void; close: () => void } {
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

  function handleEscKey(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      close();
    }
  }

  $('.modal-backdrop')?.addEventListener('click', close);

  return { modal, open, close };
}

export default Modal;
