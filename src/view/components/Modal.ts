import { useEvents } from '../../utils/core';

interface ModalProps {
  closeModal(): void;
  children: string;
}

function Modal({ children, closeModal }: ModalProps) {
  const [addEvent] = useEvents('.modal');

  addEvent('click', '.modal-backdrop', closeModal);

  return `
    <div class="modal modal--open">
      <div class="modal-backdrop"></div>
      <div class="modal-container">
        ${children}
      </div>
    </div>
  `;
}

export { Modal };
