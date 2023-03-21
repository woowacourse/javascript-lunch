import { parseAttribute } from '../../../utils/common/domHelper';
import { Attribute } from '../../../utils/common/domHelper';
import { useEvents } from '../../../utils/core';

interface ModalProps {
  attribute?: Attribute;
  closeModal(): void;
  children: string;
}

function Modal({ children, closeModal, attribute }: ModalProps) {
  const [addEvent] = useEvents('.modal');

  addEvent('click', '.modal-backdrop', closeModal);

  return `
    <div ${attribute ? parseAttribute(attribute) : 'class="modal modal--open"'}>
      <div class="modal-backdrop"></div>
      <div class="modal-container">
        ${children}
      </div>
    </div>
  `;
}

export { Modal };
