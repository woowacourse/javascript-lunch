function createModal({ classNames }) {
  const modal = `<div class="modal">
      <div class="modal-backdrop"></div>
      <div class="modal-container ${classNames.join(' ')}">
      </div>
    </div>`;

  return modal;
}

export default createModal;
