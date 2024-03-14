import { renderBaseModalContainer } from './renderHandlers';
import dimmerClickHandler from './eventHandlers';

function Modal(modalContents?: Element) {
  renderBaseModalContainer(modalContents);

  dimmerClickHandler();
}

export default Modal;
